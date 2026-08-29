export const CHAT_CATEGORIES = [
  'ACCESO',
  'CAPACITACIONES',
  'PUBLICACIONES',
  'SOPORTE_TECNICO',
  'GENERAL',
] as const;

export type ChatCategory = (typeof CHAT_CATEGORIES)[number];

export const CHAT_MESSAGE_ROLES = ['user', 'assistant'] as const;

export type ChatMessageRole = (typeof CHAT_MESSAGE_ROLES)[number];

export interface ChatConversationMessage {
  role: ChatMessageRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  messages?: ChatConversationMessage[];
}

export interface ChatDecision {
  message: string;
  category: ChatCategory;
  resolved: boolean;
  requiresHumanSupport: boolean;
}

export interface ChatResponse extends ChatDecision {
  success: true;
  provider: 'gemini' | 'groq';
  providerSucceeded: boolean;
  fallbackUsed: boolean;
}

export interface EscalateRequest {
  message: string;
  email: string;
  name?: string;
}

export interface EscalateResponse {
  success: true;
  message: string;
}

export type ChatErrorCode =
  | 'INVALID_MESSAGE'
  | 'INVALID_ESCALATION'
  | 'CHAT_PROVIDER_UNAVAILABLE'
  | 'CHAT_SERVICE_ERROR'
  | 'EMAIL_SERVICE_UNAVAILABLE'
  | 'RATE_LIMIT_EXCEEDED'
  | 'METHOD_NOT_ALLOWED'
  | 'CHAT_ROUTE_NOT_FOUND';

export interface ChatErrorResponse {
  success: false;
  error: ChatErrorCode;
  message: string;
}
