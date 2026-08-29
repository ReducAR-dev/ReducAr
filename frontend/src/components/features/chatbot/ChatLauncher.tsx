import { forwardRef } from "react";
import chatbotLogo from "../../../assets/logo-chatbot.png";

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
      aria-label={isOpen ? "Cerrar RedBot" : "Abrir RedBot"}
      aria-expanded={isOpen}
      aria-controls="reduc-ar-chat-panel"
    >
      {isOpen ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <img
          className="chatbot-launcher-logo"
          src={chatbotLogo}
          alt=""
          aria-hidden="true"
        />
      )}
      <span className="chatbot-launcher-status" aria-hidden="true" />
    </button>
  ),
);

ChatLauncher.displayName = "ChatLauncher";

export default ChatLauncher;
