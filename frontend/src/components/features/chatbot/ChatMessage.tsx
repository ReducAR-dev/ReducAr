import type { ChatUiMessage } from "../../../types/chatbot.types";

interface ChatMessageProps {
  message: ChatUiMessage;
  onRequestHelp: () => void;
  onDeclineHelp: () => void;
  helpDismissed: boolean;
}

function ChatMessage({
  message,
  onRequestHelp,
  onDeclineHelp,
  helpDismissed,
}: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <article
      className={`chatbot-message chatbot-message-${message.role}`}
      aria-label={isAssistant ? "Mensaje del asistente" : "Tu mensaje"}
    >
      {isAssistant && (
        <span className="chatbot-message-author" aria-hidden="true">
          RedBot
        </span>
      )}

      <p>{message.content}</p>

      {message.requiresHumanSupport && !helpDismissed && (
        <div className="chatbot-admin-notice">
          <strong>Esta consulta necesita revisión del equipo de ReducAR.</strong>
          <div className="chatbot-admin-actions">
            <button type="button" onClick={onRequestHelp}>
              Enviar consulta
            </button>
            <button type="button" onClick={onDeclineHelp}>
              No, gracias
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default ChatMessage;
