// src/pages/usuario/MiCuentaPage.tsx
import { useState } from "react";

export default function MiCuentaPage() {
  const [nombre, setNombre] = useState("Juan");
  const [apellido, setApellido] = useState("Pérez");
  const [email, setEmail] = useState("juan.perez@example.com");
  const [telefono, setTelefono] = useState("+54 9 11 1234-5678");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO DE BIENVENIDA */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-reducar-primary/40 bg-reducar-shell-surface p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-linear-to-br from-reducar-primary to-reducar-turquoise text-white flex items-center justify-center text-3xl font-black shadow-lg">
                JP
              </div>
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-reducar-shell-surface" title="Activo"></span>
            </div>
            <div>
              <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-xs font-bold text-reducar-primary">
                CUENTA ESTÁNDAR (EJEMPLO)
              </span>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
                {nombre} {apellido}
              </h1>
              <p className="text-reducar-shell-text-secondary text-sm">{email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-reducar-bg border border-reducar-shell-border px-4 py-3 rounded-xl text-center">
              <span className="block text-2xl font-bold text-reducar-primary">4</span>
              <span className="text-xs text-reducar-shell-text-secondary">Cursos Activos</span>
            </div>
            <div className="bg-reducar-bg border border-reducar-shell-border px-4 py-3 rounded-xl text-center">
              <span className="block text-2xl font-bold text-reducar-turquoise">12</span>
              <span className="text-xs text-reducar-shell-text-secondary">Favoritos</span>
            </div>
          </div>
        </div>

        {/* ALERTA DE EJEMPLO */}
        {saved && (
          <div className="mb-6 rounded-xl border border-emerald-500 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-300 text-sm flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span>¡Los cambios de ejemplo se han guardado correctamente! (Vista estática)</span>
          </div>
        )}

        {/* GRID PRINCIPAL */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* MENÚ LATERAL RÁPIDO */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-5 shadow-lg">
              <h2 className="text-lg font-bold text-reducar-primary mb-4">Secciones</h2>
              <nav className="space-y-2 text-sm">
                <a href="#datos" className="block px-4 py-2.5 rounded-xl bg-reducar-primary/10 text-reducar-primary font-medium border border-reducar-primary/30">
                  👤 Datos Personales
                </a>
                <a href="#seguridad" className="block px-4 py-2.5 rounded-xl text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition">
                  🔒 Seguridad y Contraseña
                </a>
                <a href="#notificaciones" className="block px-4 py-2.5 rounded-xl text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition">
                  🔔 Notificaciones
                </a>
                <a href="#suscripcion" className="block px-4 py-2.5 rounded-xl text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition">
                  ⭐ Membresía y Planes
                </a>
              </nav>
            </div>

            <div className="rounded-2xl border border-reducar-turquoise/30 bg-reducar-shell-surface p-5">
              <h3 className="font-bold text-reducar-turquoise text-sm">¿Necesitas ayuda?</h3>
              <p className="text-xs text-reducar-shell-text-secondary mt-2">
                Consulta nuestra sección de preguntas frecuentes o comunícate con soporte técnico.
              </p>
              <a href="/ayuda" className="mt-3 inline-block text-xs font-bold text-reducar-primary hover:underline">
                Ir al Centro de Ayuda →
              </a>
            </div>
          </div>

          {/* FORMULARIO / CONTENIDO PRINCIPAL */}
          <div className="md:col-span-2 space-y-6">

            {/* DATOS PERSONALES */}
            <div id="datos" className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl">
              <h2 className="text-xl font-bold text-reducar-shell-text mb-4 flex items-center gap-2">
                <span>📝</span> Información Personal (Ejemplo)
              </h2>
              <p className="text-sm text-reducar-shell-text-secondary mb-6">
                Actualiza tus datos básicos de perfil para personalizar tu experiencia en ReducAR.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-reducar-shell-text-secondary uppercase mb-1">Nombre</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-reducar-text text-sm focus:border-reducar-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-reducar-shell-text-secondary uppercase mb-1">Apellido</label>
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="w-full rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-reducar-text text-sm focus:border-reducar-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-reducar-shell-text-secondary uppercase mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-reducar-text text-sm focus:border-reducar-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-reducar-shell-text-secondary uppercase mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-reducar-text text-sm focus:border-reducar-primary focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Guardar cambios (Ejemplo)
                  </button>
                </div>
              </form>
            </div>

            {/* SEGURIDAD */}
            <div id="seguridad" className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl">
              <h2 className="text-xl font-bold text-reducar-shell-text mb-4 flex items-center gap-2">
                <span>🔒</span> Seguridad y Contraseña
              </h2>
              <p className="text-sm text-reducar-shell-text-secondary mb-4">
                Gestiona tu contraseña y los accesos de seguridad de tu cuenta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => alert("Simulación: Se ha enviado un correo para restablecer tu contraseña.")}
                  className="rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-sm font-semibold text-reducar-shell-text hover:bg-reducar-shell-hover transition"
                >
                  Cambiar contraseña
                </button>
                <button
                  type="button"
                  onClick={() => alert("Simulación: Autenticación de dos factores activada.")}
                  className="rounded-xl border border-reducar-primary/50 bg-reducar-primary/10 px-4 py-2.5 text-sm font-semibold text-reducar-primary hover:bg-reducar-primary/20 transition"
                >
                  Activar verificación en 2 pasos
                </button>
              </div>
            </div>

            {/* ZONA DE PELIGRO / ACCIONES */}
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-red-500 dark:text-red-400 mb-2">Zona de Peligro</h2>
              <p className="text-sm text-reducar-shell-text-secondary mb-4">
                Acciones permanentes sobre tu cuenta de ejemplo.
              </p>
              <button
                type="button"
                onClick={() => alert("Simulación: Cuenta desactivada (demo).")}
                className="rounded-xl border border-red-500/60 bg-red-500/20 px-4 py-2 text-xs font-bold text-red-600 dark:text-red-300 hover:bg-red-500/30 transition"
              >
                Desactivar cuenta temporalmente
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
