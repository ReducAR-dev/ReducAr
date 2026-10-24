import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import type { OAuthProvider } from "../../types/auth.types";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const { login, loginConOAuth } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      await login({ email: data.email, password: data.password });
      const from = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión",
      );
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    setServerError(null);
    setOauthLoading(provider);
    try {
      await loginConOAuth(provider);
    } catch (err) {
      setOauthLoading(null);
      setServerError(
        err instanceof Error
          ? err.message
          : `No se pudo iniciar sesión con ${provider}`,
      );
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all";

  const oauthButtonClass =
    "w-full h-10 inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-reducar-border bg-reducar-surface text-reducar-text text-sm font-semibold hover:bg-reducar-surface-soft hover:border-reducar-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  const isBusy = !!oauthLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <section className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-reducar-text tracking-tight mb-3">
            Iniciá sesión en{" "}
            <span className="text-reducar-primary">ReducAR</span>
          </h1>
          <p className="text-base text-reducar-text-secondary leading-relaxed">
            Accedé a tu cuenta para guardar cursos, seguir tus rutas y
            postularte a programas.
          </p>
        </section>

        <div className="max-w-2xl mx-auto p-4 bg-reducar-primary-light rounded-3xl shadow-2xl flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="w-full max-w-2xl p-10 bg-reducar-surface rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Formulario tradicional */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-reducar-text"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                {...register("email")}
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-reducar-text"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-reducar-text-secondary hover:text-reducar-primary transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mb-2 text-sm">
              <button
                type="button"
                onClick={() => navigate("/recuperar-password")}
                className="text-reducar-primary font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {serverError && (
              <p className="mt-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="mt-4 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Iniciando sesión…" : "Iniciar sesión"}
              {!isSubmitting && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Divisor + OAuth abajo */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-reducar-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-reducar-surface px-3 text-reducar-text-secondary font-semibold tracking-wider">
                  o continuá con
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                disabled={isBusy}
                className={oauthButtonClass}
              >
                {oauthLoading === "google" ? (
                  "Conectando con Google…"
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                    </svg>
                    Continuar con Google
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleOAuth("github")}
                disabled={isBusy}
                className={oauthButtonClass}
              >
                {oauthLoading === "github" ? (
                  "Conectando con GitHub…"
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                    </svg>
                    Continuar con GitHub
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-reducar-text-secondary text-center">
              ¿No tenés cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/registro")}
                className="text-reducar-primary font-semibold hover:underline"
              >
                Registrate
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}