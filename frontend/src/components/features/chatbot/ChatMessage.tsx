import type { ChatUiMessage } from "../../../types/chatbot.types";

interface ChatMessageProps {
  message: ChatUiMessage;
  onRequestHelp: () => void;
}

function ChatMessage({ message, onRequestHelp }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <article
      className={`chatbot-message chatbot-message-${message.role}`}
      aria-label={isAssistant ? "Mensaje del asistente" : "Tu mensaje"}
    >
      {isAssistant && (
        <span className="chatbot-message-author" aria-hidden="true">
          ReducAR
        </span>
      )}

      <p>{message.content}</p>

      {message.requiresAdmin && (
        <div className="chatbot-admin-notice">
          <strong>Esta consulta necesita revisión del equipo de ReducAR.</strong>
          <button type="button" onClick={onRequestHelp}>
            Solicitar ayuda
          </button>
        </div>
      )}
    </article>
  );
}

export default ChatMessage;
