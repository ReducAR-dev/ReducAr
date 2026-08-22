import { useCallback, useEffect, useRef, useState } from "react";

import { ChatbotApiError, sendChatMessage } from "../services/chatbotApi";
import type {
  ChatHistoryMessage,
  ChatUiMessage,
} from "../types/chatbot.types";

const INITIAL_MESSAGE: ChatUiMessage = {
  id: "reduc-ar-welcome",
  role: "assistant",
  content:
    "¡Hola! Soy el asistente virtual de ReducAR. Puedo orientarte sobre el uso de la plataforma. ¿En qué te ayudo?",
  localOnly: true,
};

const createMessageId = (): string =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getFriendlyError = (error: unknown): string => {
  if (error instanceof ChatbotApiError && error.status === 429) {
    return "Realizaste varias consultas seguidas. Esperá un momento e intentá nuevamente.";
  }

  return "El asistente no está disponible en este momento. Intentá nuevamente.";
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatUiMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      const normalizedContent = content.trim();

      if (!normalizedContent || isLoading) {
        return;
      }

      const history: ChatHistoryMessage[] = messages
        .filter((message) => !message.localOnly)
        .slice(-8)
        .map(({ role, content: historyContent }) => ({
          role,
          content: historyContent,
        }));
      const userMessage: ChatUiMessage = {
        id: createMessageId(),
        role: "user",
        content: normalizedContent,
      };

      setMessages((currentMessages) => [...currentMessages, userMessage]);
      setError(null);
      setIsLoading(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await sendChatMessage(
          {
            message: normalizedContent,
            ...(history.length > 0 ? { messages: history } : {}),
          },
          controller.signal,
        );

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: createMessageId(),
            role: "assistant",
            content: response.message,
            category: response.category,
            resolved: response.resolved,
            requiresAdmin: response.requiresAdmin,
          },
        ]);
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError(getFriendlyError(requestError));
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [isLoading, messages],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearError,
  };
};
