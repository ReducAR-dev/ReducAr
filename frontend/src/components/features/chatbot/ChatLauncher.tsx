import { forwardRef } from "react";

interface ChatLauncherProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatLauncher = forwardRef<HTMLButtonElement, ChatLauncherProps>(
  ({ isOpen, onClick }, ref) => (
    <button
      ref={ref}
      className="chatbot-launcher"
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Cerrar asistente ReducAR" : "Abrir asistente ReducAR"}
      aria-expanded={isOpen}
      aria-controls="reduc-ar-chat-panel"
    >
      {isOpen ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 17.5 3.8 21l4-1.3c1.2.7 2.6 1.1 4.2 1.1 4.9 0 8.8-3.8 8.8-8.5S16.9 3.8 12 3.8s-8.8 3.8-8.8 8.5c0 2 .7 3.8 1.8 5.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M8 12.3h.01M12 12.3h.01M16 12.3h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}
      <span className="chatbot-launcher-status" aria-hidden="true" />
    </button>
  ),
);

ChatLauncher.displayName = "ChatLauncher";

export default ChatLauncher;
