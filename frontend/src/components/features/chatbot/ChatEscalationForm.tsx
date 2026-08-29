import { useState, type FormEvent } from "react";

interface EscalationContact {
  email: string;
  name?: string;
}

interface ChatEscalationFormProps {
  disabled: boolean;
  error: string | null;
  onCancel: () => void;
  onSubmit: (contact: EscalationContact) => Promise<void>;
}

function ChatEscalationForm({
  disabled,
  error,
  onCancel,
  onSubmit,
}: ChatEscalationFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const normalizedName = name.trim();

    if (!normalizedEmail || disabled) {
      return;
    }

    void onSubmit({
      email: normalizedEmail,
      ...(normalizedName ? { name: normalizedName } : {}),
    });
  };

  return (
    <form className="chatbot-escalation-form" onSubmit={handleSubmit}>
      <strong>Enviar consulta al equipo</strong>
      <p>Necesitamos tu email para que puedan contactarte.</p>

      <label htmlFor="reduc-ar-support-name">Nombre (opcional)</label>
      <input
        id="reduc-ar-support-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={100}
        autoComplete="name"
        disabled={disabled}
      />

      <label htmlFor="reduc-ar-support-email">Email</label>
      <input
        id="reduc-ar-support-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        maxLength={254}
        autoComplete="email"
        required
        disabled={disabled}
      />

      {error && <p className="chatbot-escalation-error" role="alert">{error}</p>}

      <div className="chatbot-escalation-actions">
        <button type="submit" disabled={disabled || !email.trim()}>
          {disabled ? "Enviando..." : "Confirmar envío"}
        </button>
        <button type="button" onClick={onCancel} disabled={disabled}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ChatEscalationForm;
