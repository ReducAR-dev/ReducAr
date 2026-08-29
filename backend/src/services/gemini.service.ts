import { CHAT_SYSTEM_PROMPT } from '../prompts/chat.system-prompt.js';
import {
  CHAT_CATEGORIES,
  type ChatDecision,
  type ChatRequest,
} from '../types/chat.types.js';

const GEMINI_API_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';
const DEFAULT_TIMEOUT_MS = 45_000;
const MIN_TIMEOUT_MS = 5_000;
const MAX_TIMEOUT_MS = 120_000;
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY_MS = 500;
const MODEL_NAME_PATTERN = /^[a-zA-Z0-9._-]+$/;

const CHAT_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    message: { type: 'STRING' },
    category: { type: 'STRING', enum: CHAT_CATEGORIES },
    resolved: { type: 'BOOLEAN' },
    requiresHumanSupport: { type: 'BOOLEAN' },
  },
  required: ['message', 'category', 'resolved', 'requiresHumanSupport'],
} as const;

export type GeminiServiceErrorCode =
  | 'CONFIGURATION'
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'INVALID_API_KEY'
  | 'PERMISSION_DENIED'
  | 'QUOTA_EXCEEDED'
  | 'MODEL_NOT_FOUND'
  | 'INVALID_REQUEST'
  | 'PROVIDER_ERROR'
  | 'INVALID_RESPONSE';

export interface GeminiErrorDetails {
  httpStatus?: number;
  providerCode?: number | string;
  providerStatus?: string;
  providerMessage?: string;
  causeName?: string;
  causeMessage?: string;
  attempts?: number;
}

export class GeminiServiceError extends Error {
  constructor(
    readonly code: GeminiServiceErrorCode,
    readonly details: GeminiErrorDetails = {},
  ) {
    super(code);
    this.name = 'GeminiServiceError';
  }
}

interface GeminiServiceOptions {
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
}

interface GeminiGenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: unknown }>;
    };
  }>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getConfiguredTimeout = (): number => {
  const configuredTimeout = Number(process.env.GEMINI_TIMEOUT_MS);

  return Number.isFinite(configuredTimeout) &&
    configuredTimeout >= MIN_TIMEOUT_MS &&
    configuredTimeout <= MAX_TIMEOUT_MS
    ? configuredTimeout
    : DEFAULT_TIMEOUT_MS;
};

const getErrorMessage = (error: unknown): string | undefined =>
  error instanceof Error ? error.message : undefined;

const getCauseDetails = (error: unknown): GeminiErrorDetails => {
  const causeMessage = getErrorMessage(error);

  return {
    causeName: error instanceof Error ? error.name : typeof error,
    ...(causeMessage ? { causeMessage } : {}),
  };
};

const parseProviderError = async (
  response: Response,
): Promise<GeminiErrorDetails> => {
  const details: GeminiErrorDetails = { httpStatus: response.status };

  try {
    const payload: unknown = await response.json();

    if (!isRecord(payload) || !isRecord(payload.error)) {
      return details;
    }

    const providerError = payload.error;

    if (typeof providerError.code === 'number' || typeof providerError.code === 'string') {
      details.providerCode = providerError.code;
    }

    if (typeof providerError.status === 'string') {
      details.providerStatus = providerError.status;
    }

    if (typeof providerError.message === 'string') {
      details.providerMessage = providerError.message;
    }
  } catch {
    // El status HTTP sigue siendo suficiente si Google no devuelve JSON válido.
  }

  return details;
};

const classifyProviderError = (
  details: GeminiErrorDetails,
): GeminiServiceErrorCode => {
  if (/api key not valid|invalid api key/iu.test(details.providerMessage ?? '')) {
    return 'INVALID_API_KEY';
  }

  switch (details.httpStatus) {
    case 400:
      return 'INVALID_REQUEST';
    case 401:
      return 'INVALID_API_KEY';
    case 403:
      return 'PERMISSION_DENIED';
    case 404:
      return 'MODEL_NOT_FOUND';
    case 429:
      return 'QUOTA_EXCEEDED';
    default:
      return 'PROVIDER_ERROR';
  }
};

const delayWithSignal = (
  delayMs: number,
  signal: AbortSignal,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(new Error('Gemini request aborted'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, delayMs);

    if (signal.aborted) {
      onAbort();
      return;
    }

    signal.addEventListener('abort', onAbort, { once: true });
  });

const isChatDecision = (value: unknown): value is ChatDecision => {
  if (!isRecord(value)) {
    return false;
  }

  const keys = Object.keys(value);

  return (
    keys.length === 4 &&
    keys.every((key) =>
      ['message', 'category', 'resolved', 'requiresHumanSupport'].includes(key),
    ) &&
    typeof value.message === 'string' &&
    value.message.trim().length > 0 &&
    value.message.length <= 2000 &&
    typeof value.category === 'string' &&
    CHAT_CATEGORIES.includes(value.category as (typeof CHAT_CATEGORIES)[number]) &&
    typeof value.resolved === 'boolean' &&
    typeof value.requiresHumanSupport === 'boolean'
  );
};

const parseJsonText = (text: string): unknown => {
  const normalized = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');

  return JSON.parse(normalized);
};

const parseGeminiResponse = (payload: unknown): ChatDecision | null => {
  if (!isRecord(payload)) {
    return null;
  }

  const response = payload as GeminiGenerateContentResponse;
  const parts = response.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return null;
  }

  const text = parts
    .map((part) => part.text)
    .filter((part): part is string => typeof part === 'string')
    .join('');

  if (!text) {
    return null;
  }

  try {
    const parsed = parseJsonText(text);
    return isChatDecision(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const createGeminiChatResponse = async (
  request: ChatRequest,
  options: GeminiServiceOptions = {},
): Promise<ChatDecision> => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  if (!apiKey || !MODEL_NAME_PATTERN.test(model)) {
    throw new GeminiServiceError('CONFIGURATION');
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? getConfiguredTimeout(),
  );
  const maxAttempts = Math.max(
    1,
    Math.min(options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS, DEFAULT_MAX_ATTEMPTS),
  );
  const retryDelayMs = Math.max(
    0,
    options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS,
  );

  try {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const response = await (options.fetchImplementation ?? fetch)(
        `${GEMINI_API_BASE_URL}/${encodeURIComponent(model)}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: CHAT_SYSTEM_PROMPT }],
            },
            contents: [
              ...(request.messages ?? []).map((historyMessage) => ({
                role: historyMessage.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: historyMessage.content }],
              })),
              { role: 'user', parts: [{ text: request.message }] },
            ],
            generationConfig: {
              maxOutputTokens: 600,
              thinkingConfig: {
                thinkingLevel: 'low',
              },
              responseMimeType: 'application/json',
              responseSchema: CHAT_RESPONSE_SCHEMA,
            },
          }),
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        const details = {
          ...(await parseProviderError(response)),
          attempts: attempt,
        };

        if (response.status === 503 && attempt < maxAttempts) {
          await delayWithSignal(retryDelayMs * attempt, controller.signal);
          continue;
        }

        throw new GeminiServiceError(classifyProviderError(details), details);
      }

      let payload: unknown;

      try {
        payload = await response.json();
      } catch (error) {
        throw new GeminiServiceError('INVALID_RESPONSE', {
          httpStatus: response.status,
          attempts: attempt,
          ...getCauseDetails(error),
        });
      }

      const parsedResponse = parseGeminiResponse(payload);

      if (!parsedResponse) {
        throw new GeminiServiceError('INVALID_RESPONSE', {
          httpStatus: response.status,
          attempts: attempt,
          providerMessage: 'Gemini devolvió una respuesta sin el JSON esperado.',
        });
      }

      return parsedResponse;
    }

    throw new GeminiServiceError('PROVIDER_ERROR');
  } catch (error) {
    if (error instanceof GeminiServiceError) {
      throw error;
    }

    if (controller.signal.aborted) {
      throw new GeminiServiceError('TIMEOUT', {
        ...getCauseDetails(error),
      });
    }

    throw new GeminiServiceError('NETWORK_ERROR', {
      ...getCauseDetails(error),
    });
  } finally {
    clearTimeout(timeout);
  }
};
