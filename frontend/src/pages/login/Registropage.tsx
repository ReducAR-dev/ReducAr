import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import type { OAuthProvider } from "../../types/auth.types";

// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------
function calcularEdad(fechaNacimiento: string): number | null {
  const fecha = new Date(fechaNacimiento);
  if (Number.isNaN(fecha.getTime())) return null;
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const m = hoy.getMonth() - fecha.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
  return edad;
}

const passwordChecks = [
  { id: "length",    label: "Al menos 8 caracteres",       test: (p: string) => p.length >= 8 },
  { id: "uppercase", label: "Al menos una mayúscula",      test: (p: string) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "Al menos una minúscula",      test: (p: string) => /[a-z]/.test(p) },
  { id: "number",    label: "Al menos un número",          test: (p: string) => /[0-9]/.test(p) },
  { id: "special",   label: "Al menos un caracter especial", test: (p: string) => /[^A-Za-z0-9\s]/.test(p) },
] as const;

function getStrength(metCount: number, total: number) {
  const pct = Math.round((metCount / total) * 100);
  if (metCount === 0) {
    return { pct: 0, bgClass: "", label: "", textClass: "" };
  }
  if (metCount <= 2) {
    return { pct, bgClass: "bg-red-500", label: "Insegura", textClass: "text-red-500" };
  }
  if (metCount < total) {
    return { pct, bgClass: "bg-emerald-500", label: "Segura", textClass: "text-emerald-600" };
  }
  // "Muy segura": blanca con glow para que se vea sobre cualquier fondo
  return {
    pct: 100,
    bgClass: "bg-white shadow-[0_0_10px_rgba(16,185,129,0.9)]",
    label: "Muy segura",
    textClass: "text-emerald-600",
  };
}

// -----------------------------------------------------------
// Íconos
// -----------------------------------------------------------
function EyeOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// -----------------------------------------------------------
// Schema
// -----------------------------------------------------------
const signupSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
    apellido: z
      .string()
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
    fechaNacimiento: z
      .string()
      .min(1, "La fecha de nacimiento es obligatoria")
      .refine((val) => !Number.isNaN(Date.parse(val)), "Fecha inválida")
      .refine((val) => {
        const edad = calcularEdad(val);
        return edad !== null && edad >= 15;
      }, "Debés tener al menos 15 años")
      .refine((val) => {
        const edad = calcularEdad(val);
        return edad !== null && edad <= 120;
      }, "La fecha ingresada no es válida. Verificá el año."),
    email: z
      .string()
      .trim()
      .min(1, "El correo es obligatorio")
      .email("Ingresá un correo válido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[a-z]/, "Debe tener al menos una minúscula")
      .regex(/[0-9]/, "Debe tener al menos un número")
      .regex(/[^A-Za-z0-9\s]/, "Debe tener al menos un caracter especial"),
    confirmarPassword: z.string().min(1, "Confirmá tu contraseña"),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

// -----------------------------------------------------------
// Página
// -----------------------------------------------------------
export default function RegistroPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { register: registerUser, loginConOAuth } = useAuth();

  // Estado en vivo de la contraseña
  const password = watch("password") || "";
  const checks = passwordChecks.map((c) => ({ ...c, met: c.test(password) }));
  const metCount = checks.filter((c) => c.met).length;
  const strength = getStrength(metCount, passwordChecks.length);

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    try {
      await registerUser({
        nombre: data.nombre,
        apellido: data.apellido,
        fecha_nacimiento: data.fechaNacimiento,
        email: data.email,
        password: data.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No se pudo crear la cuenta",
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
  const today = new Date().toISOString().split("T")[0];
  const minDateObj = new Date();
  minDateObj.setFullYear(minDateObj.getFullYear() - 120);
  const minDate = minDateObj.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-reducar-text tracking-tight mb-3">
            Sumate a <span className="text-reducar-primary">ReducAR</span>
          </h1>
          <p className="text-base text-reducar-text-secondary leading-relaxed">
            Creá tu cuenta en menos de un minuto y empezá a explorar
            oportunidades de formación.
          </p>
        </section>

        <div className="max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-10 flex flex-col bg-reducar-surface rounded-3xl shadow-2xl border border-reducar-border"
          >
            {/* ============================================
                HEADER CON "VIDA"
               ============================================ */}
            <div className="relative flex flex-col items-center text-center mb-6">
              {/* Glow de fondo */}
              <div
                className="absolute -top-2 w-28 h-28 rounded-full bg-reducar-primary/20 blur-2xl animate-pulse"
                aria-hidden="true"
              />

              {/* Icono con gradiente + anillo pulsante */}
              <div className="relative w-16 h-16 mb-4">
                <div
                  className="absolute inset-0 rounded-2xl bg-reducar-primary/30 animate-ping"
                  style={{ animationDuration: "3s" }}
                  aria-hidden="true"
                />
                <div className="relative w-full h-full grid place-items-center rounded-2xl bg-linear-to-br from-reducar-primary to-reducar-primary-dark shadow-lg shadow-reducar-primary/40 ring-4 ring-reducar-primary/10">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8" />
                    <path
                      d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-reducar-text mb-1.5">
                Creá tu cuenta
              </h2>

              {/* Línea decorativa */}
              <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-reducar-primary" />
                <span className="w-8 h-1.5 rounded-full bg-reducar-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-reducar-primary" />
              </div>

              <p className="text-sm text-reducar-text-secondary leading-relaxed">
                Completá tus datos para empezar. Es gratis.
              </p>
            </div>

            {/* Nombre + Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label htmlFor="nombre" className="block mb-1.5 text-sm font-bold text-reducar-text">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  {...register("nombre")}
                  className={inputClass}
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-red-500">{errors.nombre.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="apellido" className="block mb-1.5 text-sm font-bold text-reducar-text">
                  Apellido
                </label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Tu apellido"
                  autoComplete="family-name"
                  {...register("apellido")}
                  className={inputClass}
                />
                {errors.apellido && (
                  <p className="mt-1 text-xs text-red-500">{errors.apellido.message}</p>
                )}
              </div>
            </div>

            {/* Fecha de nacimiento */}
            <div className="mb-4">
              <label htmlFor="fechaNacimiento" className="block mb-1.5 text-sm font-bold text-reducar-text">
                Fecha de nacimiento
              </label>
              <input
                id="fechaNacimiento"
                type="date"
                min={minDate}
                max={today}
                {...register("fechaNacimiento")}
                className={inputClass}
              />
              {errors.fechaNacimiento && (
                <p className="mt-1 text-xs text-red-500">{errors.fechaNacimiento.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1.5 text-sm font-bold text-reducar-text">
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
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1.5 text-sm font-bold text-reducar-text">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("password")}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-reducar-text-secondary hover:text-reducar-primary transition-colors"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>

              {/* Barra + checklist (solo si hay texto) */}
              {password.length > 0 && (
                <>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-reducar-surface-soft rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${strength.bgClass}`}
                        style={{ width: `${strength.pct}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-semibold ${strength.textClass}`}>
                      {strength.label}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1">
                    {checks.map((check) => (
                      <li
                        key={check.id}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          check.met ? "text-emerald-600" : "text-reducar-text-secondary"
                        }`}
                      >
                        {check.met ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                            <path
                              d="M7 12l3 3 7-7"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-50">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                        <span className={check.met ? "line-through decoration-emerald-500/70" : ""}>
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmarPassword" className="block mb-1.5 text-sm font-bold text-reducar-text">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmarPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmarPassword")}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-reducar-text-secondary hover:text-reducar-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {errors.confirmarPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmarPassword.message}</p>
              )}
            </div>

            {serverError && (
              <p className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="mt-2 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando cuenta…" : "Crear mi cuenta"}
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

            {/* Divisor + OAuth */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-reducar-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-reducar-surface px-3 text-reducar-text-secondary font-semibold tracking-wider">
                  o registrate con
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

            <p className="mt-4 text-xs text-center text-reducar-text-secondary">
              ¿Ya tenés cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-reducar-primary font-semibold hover:underline"
              >
                Iniciá sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}