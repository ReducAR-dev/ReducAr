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

export interface ChatResponse {
  message: string;
  category: ChatCategory;
  resolved: boolean;
  requiresAdmin: boolean;
}

export type ChatErrorCode =
  | 'INVALID_MESSAGE'
  | 'CHAT_PROVIDER_UNAVAILABLE'
  | 'CHAT_SERVICE_ERROR'
  | 'RATE_LIMIT_EXCEEDED'
  | 'METHOD_NOT_ALLOWED'
  | 'CHAT_ROUTE_NOT_FOUND';

export interface ChatErrorResponse {
  error: ChatErrorCode;
  message: string;
}
