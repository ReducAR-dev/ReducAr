// src/pages/Registropage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PromoBar from "../components/features/PromoBar";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

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
        const fecha = new Date(val);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const m = hoy.getMonth() - fecha.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
        return edad >= 13;
      }, "Debés tener al menos 13 años"),
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
      .regex(/[0-9]/, "Debe tener al menos un número"),
    confirmarPassword: z.string().min(1, "Confirmá tu contraseña"),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegistroPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    try {
      // 1. Crear la cuenta
      await authService.signup({
        nombre: data.nombre,
        apellido: data.apellido,
        fecha_nacimiento: data.fechaNacimiento,
        email: data.email,
        password: data.password,
      });

      // 2. Login automático con las mismas credenciales
      const { session, perfil } = await authService.loginConPerfil({
        email: data.email,
        password: data.password,
      });

      // 3. Guardar sesión en el store
      useAuthStore
        .getState()
        .setSession(session.access_token, session.refresh_token, perfil);

      // 4. Redirigir al home
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "No se pudo crear la cuenta";
      setServerError(msg);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all";

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />

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
            <div className="w-12 h-12 grid place-items-center rounded-2xl bg-reducar-primary-light mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#7b6cf6" strokeWidth="1.8" />
                <path
                  d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                  stroke="#7b6cf6"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold text-reducar-text mb-2">
              Creá tu cuenta
            </h2>
            <p className="text-sm text-reducar-text-secondary leading-relaxed mb-6">
              Completá tus datos para empezar. Es gratis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-1.5 text-sm font-bold text-reducar-text"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  {...register("nombre")}
                  className={inputClass}
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="apellido"
                  className="block mb-1.5 text-sm font-bold text-reducar-text"
                >
                  Apellido
                </label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Tu apellido"
                  {...register("apellido")}
                  className={inputClass}
                />
                {errors.apellido && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="fechaNacimiento"
                className="block mb-1.5 text-sm font-bold text-reducar-text"
              >
                Fecha de nacimiento
              </label>
              <input
                id="fechaNacimiento"
                type="date"
                {...register("fechaNacimiento")}
                className={inputClass}
              />
              {errors.fechaNacimiento && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fechaNacimiento.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1.5 text-sm font-bold text-reducar-text"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-bold text-reducar-text"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmarPassword"
                className="block mb-1.5 text-sm font-bold text-reducar-text"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmarPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmarPassword")}
                className={inputClass}
              />
              {errors.confirmarPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmarPassword.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
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