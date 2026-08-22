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
  message: string;
  category: ChatCategory;
  resolved: boolean;
  requiresAdmin: boolean;
}

export interface ChatUiMessage extends ChatHistoryMessage {
  id: string;
  category?: ChatCategory;
  resolved?: boolean;
  requiresAdmin?: boolean;
  localOnly?: boolean;
}
