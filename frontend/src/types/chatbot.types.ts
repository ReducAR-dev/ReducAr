export type ChatCategory =
  | "ACCESO"
  | "CAPACITACIONES"
  | "PUBLICACIONES"
  | "SOPORTE_TECNICO"
  | "GENERAL";

export type ChatRole = "user" | "assistant";

export interface ChatHistoryMessage {
  role: ChatRole;
  content: string;
}

export interface ChatApiRequest {
  message: string;
  messages?: ChatHistoryMessage[];
}

export interface ChatApiResponse {
  success: true;
  message: string;
  category: ChatCategory;
  resolved: boolean;
  requiresHumanSupport: boolean;
}

export interface EscalateApiRequest {
  message: string;
  email: string;
  name?: string;
}

export interface EscalateApiResponse {
  success: true;
  message: string;
}

export interface ChatUiMessage extends ChatHistoryMessage {
  id: string;
  category?: ChatCategory;
  resolved?: boolean;
  requiresHumanSupport?: boolean;
  escalationMessage?: string;
  localOnly?: boolean;
}
