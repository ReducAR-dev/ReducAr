import { forwardRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  disabled: boolean;
  onSend: (message: string) => Promise<void>;
  onChange: () => void;
}

const MAX_MESSAGE_LENGTH = 1000;

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ disabled, onSend, onChange }, ref) => {
    const [value, setValue] = useState("");

    const submit = (): void => {
      const message = value.trim();

      if (!message || disabled) {
        return;
      }

      setValue("");
      void onSend(message);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      submit();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submit();
      }
    };

    return (
      <form className="chatbot-input-area" onSubmit={handleSubmit}>
        <label htmlFor="reduc-ar-chat-input" className="chatbot-sr-only">
          Escribí tu consulta para el asistente ReducAR
        </label>
        <div className="chatbot-input-shell">
          <textarea
            ref={ref}
            id="reduc-ar-chat-input"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              onChange();
            }}
            onKeyDown={handleKeyDown}
            maxLength={MAX_MESSAGE_LENGTH}
            rows={1}
            placeholder="Escribí tu consulta..."
            disabled={disabled}
            aria-describedby="reduc-ar-chat-hint reduc-ar-chat-count"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            aria-label="Enviar mensaje"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M7 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="chatbot-input-meta">
          <span id="reduc-ar-chat-hint">Enter para enviar · Shift + Enter para una línea nueva</span>
          <span id="reduc-ar-chat-count">{value.length}/{MAX_MESSAGE_LENGTH}</span>
        </div>
      </form>
    );
  },
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
