// src/pages/MisDatosPage.tsx
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import type { ActualizarPerfilPayload } from "../../types/user.types";

// ============================================
// Schema Unificado (Todo en uno)
// ============================================
const profileSchema = z.object({
  nombre: z.string().trim().min(2, "Mínimo 2 caracteres").max(50),
  apellido: z.string().trim().max(50).optional().or(z.literal("")),
  fecha_nacimiento: z.string().optional().or(z.literal("")),
  ubicacion: z.string().trim().max(100).optional().or(z.literal("")),
  biografia: z.string().trim().max(500).optional().or(z.literal("")),
  user_preferencia: z.string().trim().max(50).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function MisDatosPage() {
  const { user, updatePerfil, fetchPerfil, uploadFoto, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Estado para la foto
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const filePreviewRef = useRef<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nombre: "", apellido: "", fecha_nacimiento: "", 
      ubicacion: "", biografia: "", user_preferencia: "",
    },
  });

  // Cargar perfil si no está
  useEffect(() => {
    if (!user) fetchPerfil().catch(console.error);
  }, [user, fetchPerfil]);

  // Precargar formulario
  useEffect(() => {
    if (user) {
      form.reset({
        nombre: user.nombre ?? "",
        apellido: user.apellido ?? "",
        fecha_nacimiento: user.fecha_nacimiento ?? "",
        ubicacion: user.ubicacion ?? "",
        biografia: user.biografia ?? "",
        user_preferencia: user.user_preferencia ?? "",
      });
    }
  }, [user, form]);

  // Limpieza de ObjectURL
  useEffect(() => {
    return () => {
      if (filePreviewRef.current) URL.revokeObjectURL(filePreviewRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (filePreviewRef.current) URL.revokeObjectURL(filePreviewRef.current);
    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    filePreviewRef.current = url;
    setSelectedFile(file);
    setFilePreview(url);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setServerError(null);
    setSuccessMsg(null);
    try {
      const payload: ActualizarPerfilPayload = {
        nombre: data.nombre,
        apellido: data.apellido?.trim() || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
        ubicacion: data.ubicacion?.trim() || null,
        biografia: data.biografia?.trim() || null,
        user_preferencia: data.user_preferencia?.trim() || null,
      };
      await updatePerfil(payload);
      
      if (selectedFile) {
        await uploadFoto(selectedFile);
        if (filePreviewRef.current) URL.revokeObjectURL(filePreviewRef.current);
        filePreviewRef.current = null;
        setFilePreview(null);
        setSelectedFile(null);
      }
      
      setIsEditing(false);
      setSuccessMsg("Perfil actualizado correctamente.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error al guardar.");
    }
  };

  if (!user && isLoading) return <div className="min-h-screen grid place-items-center">Cargando datos...</div>;
  if (!user) return <div className="min-h-screen grid place-items-center">No se pudieron cargar tus datos.</div>;

  // Cálculos para las estadísticas
  const inicial = user.email?.[0]?.toUpperCase() ?? "?";
  const nombreCompleto = `${user.nombre} ${user.apellido || ""}`.trim();
  const avatarSrc = filePreview ?? user.foto_perfil ?? null;
  
  // Calcular días en la plataforma
  const fechaRegistro = user.fecha_registro ? new Date(user.fecha_registro) : new Date();
  const diasEnPlataforma = Math.max(1, Math.floor((new Date().getTime() - fechaRegistro.getTime()) / (1000 * 3600 * 24)));

  // Mock de datos para gráficos (a futuro se conectan a la BD)
  const actividadSemanal = [40, 70, 45, 90, 65, 100, 80]; // Porcentajes simulados
  const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* ===== CABECERA (Hero del Perfil) ===== */}
        <section className="relative bg-reducar-surface rounded-3xl border border-reducar-border shadow-xl overflow-hidden group">
          <div className="h-32 md:h-40 bg-[radial-gradient(circle_at_20%_20%,rgba(123,108,246,0.6),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(63,217,201,0.5),transparent_50%)] bg-reducar-shell-surface" />
          
          <div className="px-6 sm:px-10 pb-8 -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end gap-6 relative z-10">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-reducar-surface shrink-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-reducar-primary/50"
            >
              {avatarSrc ? (
                <img src={avatarSrc} alt={nombreCompleto} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="w-full h-full grid place-items-center bg-linear-to-br from-reducar-primary to-reducar-turquoise text-white text-5xl font-black">
                  {inicial}
                </span>
              )}
              <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
            </button>

            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-extrabold truncate">{nombreCompleto}</h1>
                <span className="px-3 py-1 rounded-full bg-reducar-primary/15 text-reducar-primary text-xs font-bold">
                  {user.rol_id === 1 ? "Administrador" : "Estudiante"}
                </span>
              </div>
              <p className="text-base text-reducar-text-secondary mt-1">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-reducar-text-secondary">
                <span className="flex items-center gap-1">📍 {user.ubicacion || "Sin ubicación"}</span>
                <span className="flex items-center gap-1">📅 Miembro desde {fechaRegistro.getFullYear()}</span>
              </div>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="shrink-0 h-11 px-6 rounded-xl bg-reducar-primary text-white font-bold text-sm shadow-lg hover:bg-reducar-primary-dark hover:-translate-y-0.5 transition-all"
              >
                Editar perfil
              </button>
            )}
          </div>
        </section>

        {/* ===== MENSAJES ===== */}
        {successMsg && <div className="p-4 rounded-xl bg-green-500/10 text-green-600 text-sm font-bold animate-[fadeIn_0.3s_ease-out]">✅ {successMsg}</div>}
        {serverError && <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold animate-[fadeIn_0.3s_ease-out]">⚠️ {serverError}</div>}

        {/* ===== MODO EDICIÓN ===== */}
        {isEditing ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-lg space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between border-b border-reducar-border pb-4">
              <h2 className="text-xl font-extrabold">Editar mis datos</h2>
              <button type="button" onClick={() => setIsEditing(false)} className="text-sm font-bold text-reducar-text-secondary hover:text-red-500">Cancelar</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-bold">Foto de perfil</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-reducar-primary file:text-white file:font-bold hover:file:bg-reducar-primary-dark file:cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nombre" id="nombre" error={form.formState.errors.nombre?.message} {...form.register("nombre")} />
                <InputField label="Apellido" id="apellido" error={form.formState.errors.apellido?.message} {...form.register("apellido")} />
                <InputField label="Fecha de nacimiento" id="fecha_nacimiento" type="date" error={form.formState.errors.fecha_nacimiento?.message} {...form.register("fecha_nacimiento")} />
                <InputField label="Ubicación" id="ubicacion" placeholder="Ciudad, País" error={form.formState.errors.ubicacion?.message} {...form.register("ubicacion")} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold">Biografía</label>
                <textarea rows={3} {...form.register("biografia")} className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border outline-none focus:border-reducar-primary resize-none" placeholder="Contá algo sobre vos..." />
              </div>

              <InputField label="Preferencia (Ej: Cursos de Data, Diseño UX...)" id="user_preferencia" placeholder="¿Qué te gusta aprender?" error={form.formState.errors.user_preferencia?.message} {...form.register("user_preferencia")} />
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={form.formState.isSubmitting} className="h-11 px-8 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50">
                {form.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        ) : (
          /* ===== MODO LECTURA Y ESTADÍSTICAS ===== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMNA IZQUIERDA: Información */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-sm">
                <h2 className="text-lg font-extrabold mb-6 flex items-center gap-2">Sobre mí</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoField label="Fecha de nacimiento" value={user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toLocaleDateString('es-AR') : null} />
                  <InfoField label="Ubicación" value={user.ubicacion} />
                  <div className="sm:col-span-2">
                    <InfoField label="Biografía" value={user.biografia} multiline />
                  </div>
                </div>
              </div>

              {/* Gráfico de Actividad (Simulado) */}
              <div className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-extrabold flex items-center gap-2">Tu actividad semanal</h2>
                  <span className="text-xs font-bold text-reducar-primary bg-reducar-primary/10 px-3 py-1 rounded-full">Últimos 7 días</span>
                </div>
                <div className="h-40 flex items-end gap-2 sm:gap-4">
                  {actividadSemanal.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-reducar-surface-soft rounded-t-lg h-full relative overflow-hidden flex items-end justify-center">
                        <div 
                          className="w-full bg-linear-to-t from-reducar-primary to-reducar-turquoise rounded-t-lg transition-all duration-1000 ease-out group-hover:opacity-80" 
                          style={{ height: `${val}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-reducar-text-secondary">{diasSemana[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Estadísticas rápidas y Preferencias */}
            <div className="space-y-6">
              {/* Card de Tiempo */}
              <div className="bg-linear-to-br from-reducar-primary to-[#5b3af0] p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <p className="text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Tiempo en ReducAR</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{diasEnPlataforma}</span>
                  <span className="text-lg font-bold text-white/80">días</span>
                </div>
                <p className="mt-4 text-xs text-white/70 leading-relaxed">Seguí explorando oportunidades para desbloquear logros y mantener tu racha activa.</p>
              </div>

              {/* Card de Preferencias */}
              <div className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-sm">
                <h2 className="text-sm font-extrabold mb-4 text-reducar-text-secondary uppercase tracking-wider">Mis intereses</h2>
                {user.user_preferencia ? (
                  <div className="flex flex-wrap gap-2">
                    {/* Simulamos que la preferencia es un string separado por comas */}
                    {user.user_preferencia.split(",").map((pref, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-reducar-turquoise/10 text-reducar-turquoise-dark font-bold text-xs border border-reducar-turquoise/20">
                        {pref.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed border-reducar-border rounded-xl">
                    <p className="text-xs text-reducar-text-secondary mb-2">Aún no definiste tus preferencias.</p>
                    <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-reducar-primary hover:underline">Añadir ahora</button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// =============================
// Helpers
// =============================
interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
  error?: string;
}

const InputField = ({ label, id, error, ...rest }: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block mb-1.5 text-sm font-bold text-reducar-text">{label}</label>
    <input id={id} {...rest} className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text outline-none focus:border-reducar-primary transition-all" />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

function InfoField({ label, value, multiline }: { label: string; value: string | null; multiline?: boolean }) {
  const hasValue = !!value?.trim();
  return (
    <div>
      <p className="text-[11px] font-extrabold tracking-wider uppercase text-reducar-text-secondary mb-1.5">{label}</p>
      <p className={`text-sm text-reducar-text ${multiline ? "whitespace-pre-line leading-relaxed" : ""}`}>
        {hasValue ? value : <span className="italic opacity-50">Sin completar</span>}
      </p>
    </div>
  );
}