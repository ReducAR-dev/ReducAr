// src/pages/ConfiguracionPage.tsx
import { useState } from "react";

export default function ConfiguracionPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("es");

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <span className="inline-flex items-center justify-center px-4 py-2 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/30 rounded-full mb-3">
            ✦ Preferencias
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-reducar-text">
            Configuración de la Cuenta
          </h1>
          <p className="text-sm text-reducar-text-secondary mt-1">
            Personalizá tu experiencia, preferencias de notificaciones y apariencia de la plataforma.
          </p>
        </div>

        {/* Sección Apariencia */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border space-y-6">
          <h2 className="text-lg font-bold border-b border-reducar-border pb-3">
            Apariencia e Idioma
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reducar-text-secondary mb-2">
                Tema de la plataforma
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
              >
                <option value="dark">Oscuro (Predeterminado)</option>
                <option value="light">Claro</option>
                <option value="system">Igual al sistema</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reducar-text-secondary mb-2">
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
              >
                <option value="es">Español (Argentina)</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección Notificaciones */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border space-y-6">
          <h2 className="text-lg font-bold border-b border-reducar-border pb-3">
            Notificaciones y Alertas
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-reducar-surface-soft border border-reducar-border">
              <div>
                <p className="font-bold text-sm">Notificaciones Push</p>
                <p className="text-xs text-reducar-text-secondary">
                  Recibir alertas en tiempo real sobre nuevos cursos y eventos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notifications ? "bg-reducar-primary" : "bg-reducar-border"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-reducar-surface-soft border border-reducar-border">
              <div>
                <p className="font-bold text-sm">Alertas por Correo Electrónico</p>
                <p className="text-xs text-reducar-text-secondary">
                  Resumen semanal de tu progreso y recomendaciones personalizadas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  emailAlerts ? "bg-reducar-primary" : "bg-reducar-border"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    emailAlerts ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Botones de acción simulados */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => alert("Cambios descartados (Vista previa)")}
            className="px-6 py-3 rounded-xl border border-reducar-border text-reducar-text font-extrabold text-sm hover:bg-reducar-surface transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => alert("Configuración guardada exitosamente (Simulación)")}
            className="px-6 py-3 rounded-xl bg-reducar-primary text-white font-extrabold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-reducar-primary/20"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
