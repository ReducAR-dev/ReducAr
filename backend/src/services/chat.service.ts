import type { ChatRequest, ChatResponse } from '../types/chat.types.js';
import {
  createGroqChatResponse,
  GroqServiceError,
} from './groq.service.js';

const SENSITIVE_VALUE_PATTERN =
  /\b(contrase(?:ñ|n)a|password|token|api[\s_-]?key|secret|clave\s+privada|c[oó]digo\s+de\s+autenticaci[oó]n)\b\s*(?:es|:|=)\s*([^\s,;]+)/giu;

export class ChatServiceError extends Error {
  constructor(readonly code: 'PROVIDER_UNAVAILABLE') {
    super(code);
    this.name = 'ChatServiceError';
  }
}

export const redactSensitiveValues = (message: string): string =>
  message.replace(
    SENSITIVE_VALUE_PATTERN,
    (_match, label: string) => `${label}: [DATO_SENSIBLE_OCULTO]`,
  );

export const createChatResponse = async (
  request: ChatRequest,
): Promise<ChatResponse> => {
  try {
    return await createGroqChatResponse({
      message: redactSensitiveValues(request.message),
      ...(request.messages
        ? {
            messages: request.messages.map((historyMessage) => ({
              ...historyMessage,
              content: redactSensitiveValues(historyMessage.content),
            })),
          }
        : {}),
    });
  } catch (error) {
    if (error instanceof GroqServiceError) {
      throw new ChatServiceError('PROVIDER_UNAVAILABLE');
    }

    throw error;
  }
};
