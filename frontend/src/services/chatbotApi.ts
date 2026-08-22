import type {
  ChatApiRequest,
  ChatApiResponse,
  ChatCategory,
} from "../types/chatbot.types";

const DEFAULT_API_URL = "http://localhost:3000";
const CHAT_CATEGORIES: readonly ChatCategory[] = [
  "ACCESO",
  "CAPACITACIONES",
  "PUBLICACIONES",
  "SOPORTE_TECNICO",
  "GENERAL",
];

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configuredApiUrl || DEFAULT_API_URL).replace(/\/$/, "");

export class ChatbotApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(
    status: number,
    code: string,
  ) {
    super(code);
    this.name = "ChatbotApiError";
    this.status = status;
    this.code = code;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isChatApiResponse = (value: unknown): value is ChatApiResponse =>
  isRecord(value) &&
  typeof value.message === "string" &&
  value.message.trim().length > 0 &&
  typeof value.category === "string" &&
  CHAT_CATEGORIES.includes(value.category as ChatCategory) &&
  typeof value.resolved === "boolean" &&
  typeof value.requiresAdmin === "boolean";

export const sendChatMessage = async (
  request: ChatApiRequest,
  signal?: AbortSignal,
): Promise<ChatApiResponse> => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ChatbotApiError(0, "NETWORK_ERROR");
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ChatbotApiError(response.status, "INVALID_SERVER_RESPONSE");
  }

  if (!response.ok) {
    const code =
      isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "CHAT_SERVICE_ERROR";

    throw new ChatbotApiError(response.status, code);
  }

  if (!isChatApiResponse(payload)) {
    throw new ChatbotApiError(response.status, "INVALID_SERVER_RESPONSE");
  }

  return payload;
};
