import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";

const forgotSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setServerError(null);
    try {
      await forgotPassword({ email: data.email });
      setSent(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar el correo. Intentá de nuevo.",
      );
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all";

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
      <div className="max-w-md mx-auto">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-reducar-text tracking-tight mb-2">
            Recuperá tu contraseña
          </h1>
          <p className="text-sm text-reducar-text-secondary leading-relaxed">
            Te enviaremos un enlace para que puedas crear una nueva.
          </p>
        </section>

        <div className="p-8 bg-reducar-surface rounded-3xl shadow-2xl">
          {sent ? (
            <div className="text-center">
              <p className="text-sm text-reducar-text mb-2">
                Si el correo está registrado, te va a llegar un mensaje en unos
                minutos.
              </p>
              <p className="text-xs text-reducar-text-secondary mb-6">
                Revisá también la carpeta de spam.
              </p>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="w-full h-11 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors"
              >
                Volver al login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

              {serverError && (
                <p className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando…" : "Enviar enlace de recuperación"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-4 w-full text-xs text-reducar-text-secondary hover:text-reducar-primary"
              >
                Volver al login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}