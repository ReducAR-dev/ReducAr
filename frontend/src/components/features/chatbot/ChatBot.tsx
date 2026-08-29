import { useEffect, useRef, useState } from "react";

import { useChatbot } from "../../../hooks/useChatbot";
import { escalateChatMessage } from "../../../services/chatbotApi";
import type { ChatUiMessage } from "../../../types/chatbot.types";
import "../../../styles/chatbot.css";
import ChatEscalationForm from "./ChatEscalationForm";
import ChatInput from "./ChatInput";
import ChatLauncher from "./ChatLauncher";
import ChatMessage from "./ChatMessage";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [helpNotice, setHelpNotice] = useState<string | null>(null);
  const [escalationTarget, setEscalationTarget] = useState<ChatUiMessage | null>(null);
  const [dismissedHelp, setDismissedHelp] = useState<Set<string>>(() => new Set());
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalationError, setEscalationError] = useState<string | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, isStreaming, error, sendMessage, clearError } = useChatbot();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [error, escalationTarget, helpNotice, isLoading, isOpen, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeChat = (): void => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const dismissHelp = (messageId: string): void => {
    setDismissedHelp((current) => {
      const next = new Set(current);
      next.add(messageId);
      return next;
    });

    if (escalationTarget?.id === messageId) {
      setEscalationTarget(null);
      setEscalationError(null);
    }
  };

  const submitEscalation = async (contact: {
    email: string;
    name?: string;
  }): Promise<void> => {
    const message = escalationTarget?.escalationMessage;

    if (!escalationTarget || !message || isEscalating) {
      return;
    }

    setIsEscalating(true);
    setEscalationError(null);

    try {
      await escalateChatMessage({ message, ...contact });
      dismissHelp(escalationTarget.id);
      setHelpNotice(
        "¡Listo! Envié tu consulta al equipo de ReducAR. Van a poder revisar tu caso.",
      );
    } catch {
      setEscalationError(
        "No pude enviar la consulta en este momento. Podés intentar nuevamente más tarde.",
      );
    } finally {
      setIsEscalating(false);
    }
  };

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section
          id="reduc-ar-chat-panel"
          className="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="reduc-ar-chat-title"
        >
          <header className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true">R</div>
            <div>
              <h2 id="reduc-ar-chat-title">RedBot</h2>
              <p><span aria-hidden="true" /> Asistente virtual</p>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={closeChat}
              aria-label="Cerrar RedBot"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div
            className="chatbot-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <p className="chatbot-privacy-note">
              No compartas contraseñas, códigos ni información bancaria.
            </p>

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                helpDismissed={dismissedHelp.has(message.id)}
                onRequestHelp={() => {
                  setEscalationTarget(message);
                  setEscalationError(null);
                  setHelpNotice(null);
                }}
                onDeclineHelp={() => dismissHelp(message.id)}
              />
            ))}

            {escalationTarget && (
              <ChatEscalationForm
                disabled={isEscalating}
                error={escalationError}
                onCancel={() => {
                  setEscalationTarget(null);
                  setEscalationError(null);
                }}
                onSubmit={submitEscalation}
              />
            )}

            {isLoading && !isStreaming && (
              <div className="chatbot-typing" role="status" aria-label="RedBot está escribiendo">
                <span />
                <span />
                <span />
              </div>
            )}

            {error && (
              <div className="chatbot-error" role="alert">
                <p>{error}</p>
                <button type="button" onClick={clearError}>Cerrar aviso</button>
              </div>
            )}

            {helpNotice && (
              <div className="chatbot-help-notice" role="status">
                <p>{helpNotice}</p>
                <button type="button" onClick={() => setHelpNotice(null)}>Entendido</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            ref={inputRef}
            disabled={isLoading || isEscalating}
            onSend={sendMessage}
            onChange={() => {
              clearError();
              setHelpNotice(null);
            }}
          />
        </section>
      )}

      <ChatLauncher
        ref={launcherRef}
        isOpen={isOpen}
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
      />
    </div>
  );
}

export default ChatBot;
