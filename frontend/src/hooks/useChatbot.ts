import { useCallback, useEffect, useRef, useState } from "react";

import { ChatbotApiError, streamChatMessage } from "../services/chatbotApi";
import type {
  ChatHistoryMessage,
  ChatUiMessage,
} from "../types/chatbot.types";

const INITIAL_MESSAGE: ChatUiMessage = {
  id: "reduc-ar-welcome",
  role: "assistant",
  content:
    "¡Hola! Soy RedBot, el asistente virtual de ReducAR. Puedo orientarte sobre el uso de la plataforma. ¿En qué te ayudo?",
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
  const [isStreaming, setIsStreaming] = useState(false);
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
      const assistantMessageId = createMessageId();
      abortControllerRef.current = controller;

      try {
        const response = await streamChatMessage(
          {
            message: normalizedContent,
            ...(history.length > 0 ? { messages: history } : {}),
          },
          (delta) => {
            setIsStreaming(true);
            setMessages((currentMessages) => {
              const existingMessage = currentMessages.some(
                (message) => message.id === assistantMessageId,
              );

              if (!existingMessage) {
                return [
                  ...currentMessages,
                  {
                    id: assistantMessageId,
                    role: "assistant",
                    content: delta,
                  },
                ];
              }

              return currentMessages.map((message) =>
                message.id === assistantMessageId
                  ? { ...message, content: message.content + delta }
                  : message,
              );
            });
          },
          controller.signal,
        );

        setMessages((currentMessages) => {
          const finalMessage: ChatUiMessage = {
            id: assistantMessageId,
            role: "assistant",
            content: response.message,
            category: response.category,
            resolved: response.resolved,
            requiresHumanSupport: response.requiresHumanSupport,
            escalationMessage: normalizedContent,
          };
          const existingMessage = currentMessages.some(
            (message) => message.id === assistantMessageId,
          );

          return existingMessage
            ? currentMessages.map((message) =>
                message.id === assistantMessageId ? finalMessage : message,
              )
            : [...currentMessages, finalMessage];
        });
      } catch (requestError) {
        setMessages((currentMessages) =>
          currentMessages.filter((message) => message.id !== assistantMessageId),
        );

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
          setIsStreaming(false);
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
    isStreaming,
    error,
    sendMessage,
    clearError,
  };
};
