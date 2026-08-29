import { CHAT_SYSTEM_PROMPT } from '../prompts/chat.system-prompt.js';
import {
  CHAT_CATEGORIES,
  type ChatDecision,
  type ChatRequest,
} from '../types/chat.types.js';

const GEMINI_API_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_GEMINI_MODEL = 'gemini-3.7-flash';
const DEFAULT_TIMEOUT_MS = 12_000;
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

const INVALID_MODEL_RESPONSE_FALLBACK: ChatDecision = {
  message:
    'No pude responder con suficiente seguridad. Si querés, podés enviar tu consulta al equipo de ReducAR.',
  category: 'GENERAL',
  resolved: false,
  requiresHumanSupport: true,
};

export type GeminiServiceErrorCode =
  | 'CONFIGURATION'
  | 'TIMEOUT'
  | 'UNAVAILABLE';

export class GeminiServiceError extends Error {
  constructor(readonly code: GeminiServiceErrorCode) {
    super(code);
    this.name = 'GeminiServiceError';
  }
}

interface GeminiServiceOptions {
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
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
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  try {
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
            responseMimeType: 'application/json',
            responseSchema: CHAT_RESPONSE_SCHEMA,
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new GeminiServiceError('UNAVAILABLE');
    }

    const payload: unknown = await response.json();
    return parseGeminiResponse(payload) ?? INVALID_MODEL_RESPONSE_FALLBACK;
  } catch (error) {
    if (error instanceof GeminiServiceError) {
      throw error;
    }

    if (controller.signal.aborted) {
      throw new GeminiServiceError('TIMEOUT');
    }

    throw new GeminiServiceError('UNAVAILABLE');
  } finally {
    clearTimeout(timeout);
  }
};
