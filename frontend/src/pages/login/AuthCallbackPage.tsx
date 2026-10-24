import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { completeOAuthLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    // Evita doble ejecución en StrictMode / re-renders.
    if (processed.current) return;
    processed.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorFromBack = params.get("error");

    if (errorFromBack) {
      setError(errorFromBack);
      return;
    }
    if (!code) {
      setError("No se recibió el código de autenticación.");
      return;
    }

    (async () => {
      try {
        await completeOAuthLogin(code);
        navigate("/", { replace: true });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No pudimos completar el inicio de sesión.",
        );
      }
    })();
  }, [completeOAuthLogin, navigate]);

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-reducar-surface rounded-3xl shadow-2xl text-center">
        {error ? (
          <>
            <h1 className="text-xl font-bold mb-2">
              No pudimos completar el inicio de sesión
            </h1>
            <p className="text-sm text-reducar-text-secondary mb-6">{error}</p>
            <button
              onClick={() => navigate("/login", { replace: true })}
              className="px-4 py-2 rounded-xl bg-reducar-primary text-white font-semibold hover:bg-reducar-primary-dark transition-colors"
            >
              Volver al login
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-2">Verificando tu sesión…</h1>
            <p className="text-sm text-reducar-text-secondary">
              Un momento, estamos preparando todo.
            </p>
          </>
        )}
      </div>
    </div>
  );
}