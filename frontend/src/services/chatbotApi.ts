import type {
  ChatApiRequest,
  ChatApiResponse,
  ChatCategory,
  EscalateApiRequest,
  EscalateApiResponse,
} from "../types/chatbot.types";

const CHAT_CATEGORIES: readonly ChatCategory[] = [
  "ACCESO",
  "CAPACITACIONES",
  "PUBLICACIONES",
  "SOPORTE_TECNICO",
  "GENERAL",
];

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configuredApiUrl || "").replace(/\/$/, "");

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
  value.success === true &&
  typeof value.message === "string" &&
  value.message.trim().length > 0 &&
  typeof value.category === "string" &&
  CHAT_CATEGORIES.includes(value.category as ChatCategory) &&
  typeof value.resolved === "boolean" &&
  typeof value.requiresHumanSupport === "boolean";

const isEscalateApiResponse = (value: unknown): value is EscalateApiResponse =>
  isRecord(value) &&
  value.success === true &&
  typeof value.message === "string" &&
  value.message.trim().length > 0;

const readJsonResponse = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    throw new ChatbotApiError(response.status, "INVALID_SERVER_RESPONSE");
  }
};

const throwResponseError = (response: Response, payload: unknown): never => {
  const code =
    isRecord(payload) && typeof payload.error === "string"
      ? payload.error
      : "CHAT_SERVICE_ERROR";

  throw new ChatbotApiError(response.status, code);
};

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

  const payload = await readJsonResponse(response);

  if (!response.ok) {
    throwResponseError(response, payload);
  }

  if (!isChatApiResponse(payload)) {
    throw new ChatbotApiError(response.status, "INVALID_SERVER_RESPONSE");
  }

  return payload;
};

export const escalateChatMessage = async (
  request: EscalateApiRequest,
): Promise<EscalateApiResponse> => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/chat/escalate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch {
    throw new ChatbotApiError(0, "NETWORK_ERROR");
  }

  const payload = await readJsonResponse(response);

  if (!response.ok) {
    throwResponseError(response, payload);
  }

  if (!isEscalateApiResponse(payload)) {
    throw new ChatbotApiError(response.status, "INVALID_SERVER_RESPONSE");
  }

  return payload;
};
