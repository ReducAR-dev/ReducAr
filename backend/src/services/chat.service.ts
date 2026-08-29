import type {
  ChatDecision,
  ChatRequest,
  ChatResponse,
} from '../types/chat.types.js';
import {
  createGeminiChatResponse,
  GeminiServiceError,
} from './gemini.service.js';
import {
  createGroqChatResponse,
  GroqServiceError,
} from './groq.service.js';

const SENSITIVE_VALUE_PATTERN =
  /\b(contrase(?:ñ|n)a|password|token|api[\s_-]?key|secret|clave\s+privada|c[oó]digo\s+de\s+autenticaci[oó]n)\b\s*(?:es|:|=)\s*([^\s,;]+)/giu;

const HUMAN_SUPPORT_PATTERNS = [
  /\b(no\s+puedo|no\s+logro|error|problema)\b.{0,60}\b(entrar|ingresar|acceder|registrarme|registro|cuenta)\b/iu,
  /\b(entrar|ingresar|acceder|registrarme|registro|cuenta)\b.{0,60}\b(no\s+puedo|no\s+logro|error|problema)\b/iu,
  /\b(hablar|contactar|comunicarme)\b.{0,40}\b(persona|equipo|administrador|soporte)\b/iu,
  /\b(reclamo|queja|denuncia|administrador)\b/iu,
  /\b(datos?\s+personales?|informaci[oó]n\s+personal)\b/iu,
] as const;

const PROVIDER_FALLBACK: ChatDecision = {
  message:
    'El asistente no está disponible temporalmente. Si querés, podés enviar tu consulta al equipo de ReducAR.',
  category: 'GENERAL',
  resolved: false,
  requiresHumanSupport: true,
};

type ChatProvider = 'gemini' | 'groq';

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

export const requiresHumanSupportByRules = (message: string): boolean =>
  HUMAN_SUPPORT_PATTERNS.some((pattern) => pattern.test(message));

const getConfiguredProvider = (): ChatProvider => {
  const configuredProvider = process.env.CHAT_PROVIDER?.trim().toLowerCase();

  if (configuredProvider === 'gemini' || configuredProvider === 'groq') {
    return configuredProvider;
  }

  if (configuredProvider) {
    throw new ChatServiceError('PROVIDER_UNAVAILABLE');
  }

  return process.env.GEMINI_API_KEY?.trim() ? 'gemini' : 'groq';
};

const ensureHumanSupportOffer = (message: string): string => {
  if (/\b(enviar|derivar|contactar)\b/iu.test(message)) {
    return message;
  }

  return `${message} Si querés, podés enviar tu consulta al equipo de ReducAR.`;
};

export const createChatResponse = async (
  request: ChatRequest,
): Promise<ChatResponse> => {
  const sanitizedRequest: ChatRequest = {
    message: redactSensitiveValues(request.message),
    ...(request.messages
      ? {
          messages: request.messages.map((historyMessage) => ({
            ...historyMessage,
            content: redactSensitiveValues(historyMessage.content),
          })),
        }
      : {}),
  };

  try {
    const provider = getConfiguredProvider();
    const decision =
      provider === 'gemini'
        ? await createGeminiChatResponse(sanitizedRequest)
        : await createGroqChatResponse(sanitizedRequest);
    const requiresHumanSupport =
      decision.requiresHumanSupport ||
      requiresHumanSupportByRules(sanitizedRequest.message);

    return {
      success: true,
      ...decision,
      message: requiresHumanSupport
        ? ensureHumanSupportOffer(decision.message)
        : decision.message,
      resolved: requiresHumanSupport ? false : decision.resolved,
      requiresHumanSupport,
    };
  } catch (error) {
    if (error instanceof GeminiServiceError || error instanceof GroqServiceError) {
      if (error.code === 'CONFIGURATION') {
        throw new ChatServiceError('PROVIDER_UNAVAILABLE');
      }

      return { success: true, ...PROVIDER_FALLBACK };
    }

    throw error;
  }
};
