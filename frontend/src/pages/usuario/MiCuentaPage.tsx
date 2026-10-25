// src/pages/usuario/MiCuentaPage.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../../stores/auth.store";
import { userService } from "../../services/user.service";

type Tab = "datos" | "seguridad" | "notificaciones" | "membresia";

const perfilSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  apellido: z.string().min(2, "Mínimo 2 caracteres").or(z.literal("")),
  fecha_nacimiento: z.string().optional().or(z.literal("")),
});
type PerfilForm = z.infer<typeof perfilSchema>;

export default function MiCuentaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("datos");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const perfil = useAuthStore((s) => s.perfil);
  const setPerfil = useAuthStore((s) => s.setPerfil);

  // React Hook Form
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PerfilForm>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nombre: perfil?.nombre || "",
      apellido: perfil?.apellido || "",
      fecha_nacimiento: perfil?.fecha_nacimiento || "",
    },
  });

  const onSubmitPerfil = async (data: PerfilForm) => {
    try {
      const updated = await userService.actualizarMiPerfil({
        nombre: data.nombre,
        apellido: data.apellido || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
      });
      setPerfil(updated); // Actualiza Zustand (y el Header)
      setSavedMsg("Datos actualizados correctamente.");
      setTimeout(() => setSavedMsg(null), 3000);
    } catch (error) {
      setSavedMsg("Error al actualizar los datos.");
    }
  };

  // Datos de usuario
  const inicial = perfil?.email?.[0]?.toUpperCase() ?? "?";
  const nombreCompleto = `${perfil?.nombre || ""} ${perfil?.apellido || ""}`.trim() || "Usuario";
  const tipoCuenta = perfil?.rol_id === 1 ? "Administrador" : "Estudiante";

  const inputClass = "w-full rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2.5 text-reducar-text text-sm focus:border-reducar-primary outline-none transition-colors";
  const labelClass = "block text-xs font-semibold text-reducar-shell-text-secondary uppercase mb-1";

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-4 py-10 md:px-8 transition-colors">
      <div className="mx-auto max-w-6xl">
        
        {/* ENCABEZADO DE BIENVENIDA */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-reducar-primary/30 bg-reducar-shell-surface p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-reducar-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="relative">
              {perfil?.foto_perfil ? (
                <img src={perfil.foto_perfil} alt="Perfil" className="h-20 w-20 rounded-full object-cover shadow-lg border-2 border-reducar-primary" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-linear-to-br from-reducar-primary to-reducar-turquoise text-white flex items-center justify-center text-3xl font-black shadow-lg">
                  {inicial}
                </div>
              )}
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-reducar-shell-surface" title="Activo"></span>
            </div>
            <div>
              <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-[10px] font-bold text-reducar-primary uppercase tracking-wider">
                {tipoCuenta}
              </span>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
                {nombreCompleto}
              </h1>
              <p className="text-reducar-shell-text-secondary text-sm">{perfil?.email}</p>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <div className="bg-reducar-bg border border-reducar-shell-border px-5 py-3 rounded-2xl text-center shadow-sm">
              <span className="block text-2xl font-bold text-reducar-primary">0</span>
              <span className="text-xs text-reducar-shell-text-secondary">Cursos Activos</span>
            </div>
            <div className="bg-reducar-bg border border-reducar-shell-border px-5 py-3 rounded-2xl text-center shadow-sm">
              <span className="block text-2xl font-bold text-reducar-turquoise">0</span>
              <span className="text-xs text-reducar-shell-text-secondary">Favoritos</span>
            </div>
          </div>
        </div>

        {/* ALERTA DE GUARDADO */}
        {savedMsg && (
          <div className="mb-6 rounded-xl border border-emerald-500 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-300 text-sm flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
            <span className="text-xl">✅</span> <span>{savedMsg}</span>
          </div>
        )}

        {/* GRID PRINCIPAL */}
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          
          {/* MENÚ LATERAL (TABS) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-4 shadow-lg flex flex-col gap-1">
              <button onClick={() => setActiveTab("datos")} className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "datos" ? "bg-reducar-primary/10 text-reducar-primary" : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover"}`}>👤 Datos Personales</button>
              <button onClick={() => setActiveTab("seguridad")} className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "seguridad" ? "bg-reducar-primary/10 text-reducar-primary" : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover"}`}>🔒 Seguridad y Contraseña</button>
              <button onClick={() => setActiveTab("notificaciones")} className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "notificaciones" ? "bg-reducar-primary/10 text-reducar-primary" : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover"}`}>🔔 Notificaciones</button>
              <button onClick={() => setActiveTab("membresia")} className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "membresia" ? "bg-reducar-primary/10 text-reducar-primary" : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover"}`}>⭐ Membresía y Planes</button>
            </div>

            {/* WIDGET DE AYUDA (Siempre visible) */}
            <div className="rounded-2xl border border-reducar-turquoise/30 bg-reducar-shell-surface p-5 shadow-sm">
              <h3 className="font-bold text-reducar-turquoise text-sm flex items-center gap-2"><span>💡</span> ¿Necesitás ayuda?</h3>
              <p className="text-xs text-reducar-shell-text-secondary mt-2 leading-relaxed">
                Consultá nuestras preguntas frecuentes o hablá con RedBot si tenés problemas con tu cuenta.
              </p>
              <a href="/ayuda" className="mt-4 inline-block text-xs font-bold text-reducar-primary hover:underline">
                Ir al Centro de Ayuda →
              </a>
            </div>
          </div>

          {/* CONTENIDO PRINCIPAL (Animado) */}
          <div className="min-w-0">
            
            {/* ================= TAB: DATOS PERSONALES ================= */}
            {activeTab === "datos" && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 md:p-8 shadow-xl">
                  <h2 className="text-xl font-extrabold text-reducar-shell-text mb-6">Información Personal</h2>
                  
                  <form onSubmit={handleSubmit(onSubmitPerfil)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Nombre</label>
                        <input {...register("nombre")} className={inputClass} />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Apellido</label>
                        <input {...register("apellido")} className={inputClass} />
                        {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Correo Electrónico (No editable)</label>
                      <input type="email" value={perfil?.email || ""} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
                    </div>
                    
                    <div>
                      <label className={labelClass}>Fecha de Nacimiento</label>
                      <input type="date" {...register("fecha_nacimiento")} className={inputClass} />
                    </div>

                    <div className="pt-4 border-t border-reducar-shell-border flex justify-end">
                      <button type="submit" disabled={isSubmitting} className="rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60">
                        {isSubmitting ? "Guardando..." : "Guardar cambios"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* ZONA DE PELIGRO (Solo en Datos Personales) */}
                <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-red-500 mb-2">Dar de baja mi cuenta</h2>
                  <p className="text-sm text-reducar-shell-text-secondary mb-4 max-w-xl">
                    Si decidís desactivar tu cuenta, tus datos no se borrarán permanentemente, pero dejarás de tener acceso a la plataforma y a tus cursos guardados.
                  </p>
                  <button type="button" className="rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500/20 transition">
                    Desactivar cuenta
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB: SEGURIDAD ================= */}
            {activeTab === "seguridad" && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 md:p-8 shadow-xl">
                  <h2 className="text-xl font-extrabold text-reducar-shell-text mb-4">Seguridad de la cuenta</h2>
                  <p className="text-sm text-reducar-shell-text-secondary mb-8 leading-relaxed">
                    Protegé tu cuenta actualizando tu contraseña periódicamente y activando la autenticación de dos factores.
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-reducar-shell-border bg-reducar-bg gap-4">
                      <div>
                        <h3 className="font-bold text-sm">Contraseña</h3>
                        <p className="text-xs text-reducar-shell-text-secondary mt-1">Cambiala si creés que alguien más la conoce.</p>
                      </div>
                      <button type="button" className="px-5 py-2.5 rounded-xl border border-reducar-shell-border font-bold text-sm hover:bg-reducar-shell-hover transition">
                        Cambiar contraseña
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-reducar-primary/30 bg-reducar-primary/5 gap-4">
                      <div>
                        <h3 className="font-bold text-sm text-reducar-primary">Verificación en 2 pasos (2FA)</h3>
                        <p className="text-xs text-reducar-shell-text-secondary mt-1">Añadí una capa extra de seguridad a tu cuenta.</p>
                      </div>
                      <button type="button" className="px-5 py-2.5 rounded-xl bg-reducar-primary text-white font-bold text-sm shadow-md hover:bg-reducar-primary-dark transition">
                        Activar 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: NOTIFICACIONES ================= */}
            {activeTab === "notificaciones" && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 md:p-8 shadow-xl">
                  <h2 className="text-xl font-extrabold text-reducar-shell-text mb-6">Preferencias de Notificaciones</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-reducar-shell-border bg-reducar-bg">
                      <div>
                        <h3 className="font-bold text-sm">Nuevos cursos y oportunidades</h3>
                        <p className="text-xs text-reducar-shell-text-secondary mt-1">Recibí un correo cuando se publique un curso que coincida con tu perfil.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-reducar-shell-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-reducar-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-reducar-shell-border bg-reducar-bg">
                      <div>
                        <h3 className="font-bold text-sm">Novedades y eventos</h3>
                        <p className="text-xs text-reducar-shell-text-secondary mt-1">Enterate de charlas y talleres comunitarios.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-reducar-shell-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-reducar-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB: MEMBRESÍA Y PLANES ================= */}
            {activeTab === "membresia" && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                
                {/* PLAN ACTUAL */}
                <div className="rounded-2xl border border-reducar-primary/40 bg-linear-to-br from-reducar-primary/10 to-reducar-turquoise/5 p-6 md:p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <span className="text-xs font-extrabold tracking-wider text-reducar-primary uppercase">Plan Actual</span>
                      <h2 className="text-3xl font-extrabold mt-1 mb-2">ReducAR Pro</h2>
                      <p className="text-sm text-reducar-shell-text-secondary">Suscripción mensual activa.</p>
                      
                      <div className="flex gap-6 mt-6">
                        <div>
                          <span className="block text-xl font-bold">$4.99</span>
                          <span className="text-[10px] uppercase text-reducar-shell-text-secondary">por mes</span>
                        </div>
                        <div>
                          <span className="block text-xl font-bold">$14.97</span>
                          <span className="text-[10px] uppercase text-reducar-shell-text-secondary">gastado en total</span>
                        </div>
                        <div>
                          <span className="block text-xl font-bold">3</span>
                          <span className="text-[10px] uppercase text-reducar-shell-text-secondary">meses suscrito</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                      <button className="px-6 py-2.5 rounded-xl bg-reducar-primary text-white font-bold text-sm shadow-md hover:bg-reducar-primary-dark transition w-full">Actualizar plan</button>
                      <button className="px-6 py-2.5 rounded-xl border border-red-500/40 text-red-500 font-bold text-sm hover:bg-red-500/10 transition w-full">Cancelar suscripción</button>
                    </div>
                  </div>
                </div>

                {/* TABLA DE PLANES */}
                <div>
                  <h3 className="text-lg font-extrabold mb-4 mt-8">Conocé nuestros planes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Free */}
                    <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-sm">
                      <h4 className="font-bold text-lg mb-2">Básico</h4>
                      <p className="text-2xl font-extrabold mb-4">Gratis</p>
                      <ul className="text-sm text-reducar-shell-text-secondary space-y-2 mb-6">
                        <li>✓ Acceso a cursos gratuitos</li>
                        <li>✓ Guardar 5 favoritos</li>
                        <li>✓ Test vocacional</li>
                      </ul>
                      <button className="w-full py-2.5 rounded-xl border border-reducar-shell-border font-bold text-sm hover:bg-reducar-shell-hover transition">Plan actual</button>
                    </div>

                    {/* Pro (Destacado) */}
                    <div className="rounded-2xl border border-reducar-primary bg-reducar-shell-surface p-6 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-reducar-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">Recomendado</div>
                      <h4 className="font-bold text-lg mb-2 text-reducar-primary">Pro</h4>
                      <p className="text-2xl font-extrabold mb-4">$4.99 <span className="text-sm font-normal text-reducar-shell-text-secondary">/mes</span></p>
                      <ul className="text-sm text-reducar-shell-text-secondary space-y-2 mb-6">
                        <li>✓ Todo lo de Básico</li>
                        <li>✓ Favoritos ilimitados</li>
                        <li>✓ Seguimiento de progreso</li>
                        <li>✓ Soporte prioritario</li>
                      </ul>
                      <button className="w-full py-2.5 rounded-xl bg-reducar-primary text-white font-bold text-sm shadow-md hover:bg-reducar-primary-dark transition">Saber más</button>
                    </div>

                    {/* Institucional */}
                    <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-sm">
                      <h4 className="font-bold text-lg mb-2">Institucional</h4>
                      <p className="text-2xl font-extrabold mb-4">Custom</p>
                      <ul className="text-sm text-reducar-shell-text-secondary space-y-2 mb-6">
                        <li>✓ Gestión de cursos propios</li>
                        <li>✓ Panel de estadísticas</li>
                        <li>✓ Verificación de institución</li>
                      </ul>
                      <a href="/contacto" className="block text-center w-full py-2.5 rounded-xl border border-reducar-shell-border font-bold text-sm hover:bg-reducar-shell-hover transition">Contactar ventas</a>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}