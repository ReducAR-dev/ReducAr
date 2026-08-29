import {
  CHAT_CATEGORIES,
  type ChatRequest,
  type ChatDecision,
} from '../types/chat.types.js';
import { CHAT_SYSTEM_PROMPT } from '../prompts/chat.system-prompt.js';

const GROQ_CHAT_COMPLETIONS_URL =
  'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-20b';
const DEFAULT_TIMEOUT_MS = 10_000;

const CHAT_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    message: { type: 'string', minLength: 1, maxLength: 2000 },
    category: { type: 'string', enum: CHAT_CATEGORIES },
    resolved: { type: 'boolean' },
    requiresHumanSupport: { type: 'boolean' },
  },
  required: ['message', 'category', 'resolved', 'requiresHumanSupport'],
  additionalProperties: false,
} as const;

const INVALID_MODEL_RESPONSE_FALLBACK: ChatDecision = {
  message:
    'No pude procesar tu consulta con suficiente seguridad. Puedo derivarla para que la revise un administrador.',
  category: 'GENERAL',
  resolved: false,
  requiresHumanSupport: true,
};

type GroqServiceErrorCode = 'CONFIGURATION' | 'TIMEOUT' | 'UNAVAILABLE';

export class GroqServiceError extends Error {
  constructor(readonly code: GroqServiceErrorCode) {
    super(code);
    this.name = 'GroqServiceError';
  }
}

interface GroqServiceOptions {
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
}

interface GroqChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isChatResponse = (value: unknown): value is ChatDecision => {
  if (!isRecord(value)) {
    return false;
  }

  const keys = Object.keys(value);
  const hasOnlyExpectedProperties =
    keys.length === 4 &&
    keys.every((key) =>
      ['message', 'category', 'resolved', 'requiresHumanSupport'].includes(key),
    );

  return (
    hasOnlyExpectedProperties &&
    typeof value.message === 'string' &&
    value.message.trim().length > 0 &&
    value.message.length <= 2000 &&
    typeof value.category === 'string' &&
    CHAT_CATEGORIES.includes(value.category as (typeof CHAT_CATEGORIES)[number]) &&
    typeof value.resolved === 'boolean' &&
    typeof value.requiresHumanSupport === 'boolean'
  );
};

const parseChatResponse = (payload: unknown): ChatDecision | null => {
  if (!isRecord(payload)) {
    return null;
  }

  const completion = payload as GroqChatCompletionResponse;
  const content = completion.choices?.[0]?.message?.content;

  if (typeof content !== 'string') {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(content);
    return isChatResponse(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const createGroqChatResponse = async (
  request: ChatRequest,
  options: GroqServiceOptions = {},
): Promise<ChatDecision> => {
  const apiKey = process.env.GROQ_API_KEY?.trim();

  if (!apiKey) {
    throw new GroqServiceError('CONFIGURATION');
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  try {
    const response = await (options.fetchImplementation ?? fetch)(
      GROQ_CHAT_COMPLETIONS_URL,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL,
          messages: [
            { role: 'system', content: CHAT_SYSTEM_PROMPT },
            ...(request.messages ?? []),
            { role: 'user', content: request.message },
          ],
          temperature: 0.2,
          max_completion_tokens: 500,
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'reduc_ar_chat_response',
              strict: true,
              schema: CHAT_RESPONSE_SCHEMA,
            },
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new GroqServiceError('UNAVAILABLE');
    }

    const payload: unknown = await response.json();
    return parseChatResponse(payload) ?? INVALID_MODEL_RESPONSE_FALLBACK;
  } catch (error) {
    if (error instanceof GroqServiceError) {
      throw error;
    }

    if (controller.signal.aborted) {
      throw new GroqServiceError('TIMEOUT');
    }

    throw new GroqServiceError('UNAVAILABLE');
  } finally {
    clearTimeout(timeout);
  }
};
