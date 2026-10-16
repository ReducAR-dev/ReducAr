// src/pages/PerfilPage.tsx
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import type { ActualizarPerfilPayload } from "../types/user.types";

// ============================================
// Schemas
// ============================================

const photoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  apellido: z
    .string()
    .trim()
    .max(50, "Máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
});

const profileSchema = z.object({
  fecha_nacimiento: z.string().optional().or(z.literal("")),
  ubicacion: z
    .string()
    .trim()
    .max(100, "Máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  biografia: z
    .string()
    .trim()
    .max(500, "Máximo 500 caracteres")
    .optional()
    .or(z.literal("")),
  user_preferencia: z
    .string()
    .trim()
    .max(50, "Máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
});

type PhotoFormValues = z.infer<typeof photoSchema>;
type ProfileFormValues = z.infer<typeof profileSchema>;
type ActiveForm = "photo" | "profile" | null;

// ============================================
// Component
// ============================================

export default function PerfilPage() {
  const { user, updatePerfil, fetchPerfil, uploadFoto, isLoading } = useAuth();

  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const [pendingAction, setPendingAction] = useState<ActiveForm>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ===== Estado local para la subida de foto =====
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  // Ref para poder revocar el ObjectURL desde cualquier efecto
  const filePreviewRef = useRef<string | null>(null);

  // ===== Form: foto + nombre + apellido =====
  const photoForm = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: { nombre: "", apellido: "" },
  });

  // ===== Form: perfil extendido =====
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fecha_nacimiento: "",
      ubicacion: "",
      biografia: "",
      user_preferencia: "",
    },
  });

  // ===== Utilidad: limpiar el preview (ObjectURL) =====
  const clearFilePreview = () => {
    if (filePreviewRef.current) {
      URL.revokeObjectURL(filePreviewRef.current);
      filePreviewRef.current = null;
    }
    setFilePreview(null);
    setSelectedFile(null);
  };

  // ===== Cleanup al desmontar =====
  useEffect(() => {
    return () => {
      if (filePreviewRef.current) {
        URL.revokeObjectURL(filePreviewRef.current);
      }
    };
  }, []);

  // ===== Cargar perfil si no está en el store =====
  useEffect(() => {
    if (!user) {
      fetchPerfil().catch(() => {
        /* el apiRequest ya hace logout si es 401 */
      });
    }
  }, [user, fetchPerfil]);

  // ===== Precargar los forms cuando llega/actualiza el user =====
  useEffect(() => {
    if (user) {
      photoForm.reset({
        nombre: user.nombre ?? "",
        apellido: user.apellido ?? "",
      });
      profileForm.reset({
        fecha_nacimiento: user.fecha_nacimiento ?? "",
        ubicacion: user.ubicacion ?? "",
        biografia: user.biografia ?? "",
        user_preferencia: user.user_preferencia ?? "",
      });
    }
  }, [user, photoForm, profileForm]);

  // ===== ¿Hay cambios sin guardar en el form activo? =====
  const hasUnsavedChanges =
    (activeForm === "photo" &&
      (photoForm.formState.isDirty || selectedFile !== null)) ||
    (activeForm === "profile" && profileForm.formState.isDirty);

  // ===== Intento de abrir un form =====
  const tryOpenForm = (next: "photo" | "profile") => {
    setServerError(null);
    setSuccessMsg(null);

    if (activeForm === next) return;
    if (activeForm === null) {
      setActiveForm(next);
      return;
    }
    if (hasUnsavedChanges) {
      setPendingAction(next);
      setShowDiscardModal(true);
      return;
    }
    setActiveForm(next);
  };

  // ===== Cerrar el form activo (con o sin descartar) =====
  const closeActiveForm = () => {
    if (activeForm === "photo") {
      photoForm.reset({
        nombre: user?.nombre ?? "",
        apellido: user?.apellido ?? "",
      });
      clearFilePreview();
    } else if (activeForm === "profile") {
      profileForm.reset({
        fecha_nacimiento: user?.fecha_nacimiento ?? "",
        ubicacion: user?.ubicacion ?? "",
        biografia: user?.biografia ?? "",
        user_preferencia: user?.user_preferencia ?? "",
      });
    }
    setActiveForm(null);
    setServerError(null);
  };

  // ===== Intento de cancelar el form actual =====
  const tryCancelForm = () => {
    if (hasUnsavedChanges) {
      setPendingAction(null); // null = solo cerrar
      setShowDiscardModal(true);
      return;
    }
    closeActiveForm();
  };

  // ===== Modal: "Volver" (sigue editando) =====
  const handleKeepEditing = () => {
    setShowDiscardModal(false);
    setPendingAction(null);
  };

  // ===== Modal: "Descartar" =====
  const handleDiscard = () => {
    setShowDiscardModal(false);
    const next = pendingAction;
    setPendingAction(null);
    closeActiveForm();
    if (next) setActiveForm(next);
  };

  // ===== Cambio de archivo seleccionado =====
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    // Liberar el preview anterior antes de asignar el nuevo.
    if (filePreviewRef.current) {
      URL.revokeObjectURL(filePreviewRef.current);
      filePreviewRef.current = null;
    }

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

  // ===== Submit: foto + nombre + apellido =====
  const onPhotoSubmit = async (data: PhotoFormValues) => {
    setServerError(null);
    setSuccessMsg(null);
    try {
      // 1. Guardar nombre y apellido vía PATCH
      await updatePerfil({
        nombre: data.nombre,
        apellido: data.apellido?.trim() || null,
      });

      // 2. Si hay archivo seleccionado, subirlo
      if (selectedFile) {
        await uploadFoto(selectedFile);
        clearFilePreview();
      }

      setActiveForm(null);
      setSuccessMsg(
        selectedFile
          ? "Foto y datos actualizados."
          : "Datos actualizados.",
      );
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No se pudo guardar.",
      );
    }
  };

  // ===== Submit: perfil extendido =====
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setServerError(null);
    setSuccessMsg(null);
    try {
      const payload: ActualizarPerfilPayload = {
        fecha_nacimiento: data.fecha_nacimiento || null,
        ubicacion: data.ubicacion?.trim() || null,
        biografia: data.biografia?.trim() || null,
        user_preferencia: data.user_preferencia?.trim() || null,
      };
      await updatePerfil(payload);
      setActiveForm(null);
      setSuccessMsg("Perfil actualizado.");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No se pudo guardar.",
      );
    }
  };

  // ===== Estados de carga =====
  if (!user && isLoading) {
    return (
      <div className="min-h-screen bg-reducar-bg text-reducar-text grid place-items-center">
        <p className="text-reducar-text-secondary">Cargando perfil…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-reducar-bg text-reducar-text grid place-items-center px-4">
        <p className="text-reducar-text-secondary text-center">
          No se pudo cargar tu perfil. Cerrá sesión y volvé a intentar.
        </p>
      </div>
    );
  }

  const inicial = user.email?.[0]?.toUpperCase() ?? "?";
  const nombreCompleto =
    `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim() || "Usuario";

  // Prioridad para mostrar en el avatar:
  // 1. Preview local (si el usuario seleccionó un archivo nuevo).
  // 2. Foto del store (foto_perfil del backend).
  // 3. Inicial.
  const avatarSrc = filePreview ?? user.foto_perfil ?? null;

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ===== Cabecera: avatar + nombre + email ===== */}
        <section className="bg-reducar-surface rounded-3xl border border-reducar-border shadow-lg overflow-hidden">
          <div className="h-24 bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark" />
          <div className="px-6 sm:px-8 pb-6 -mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar con hover de lápiz */}
            <button
              type="button"
              onClick={() => tryOpenForm("photo")}
              aria-label="Editar foto, nombre y apellido"
              className="relative group w-24 h-24 rounded-full overflow-hidden border-4 border-reducar-surface shrink-0 focus:outline-none focus:ring-2 focus:ring-reducar-primary focus:ring-offset-2 focus:ring-offset-reducar-surface"
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={nombreCompleto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full grid place-items-center bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark text-white text-3xl font-extrabold">
                  {inicial}
                </span>
              )}
              {/* Overlay con lápiz */}
              <span className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/50 transition-colors">
                <svg
                  className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </span>
            </button>

            <div className="flex-1 min-w-0 pb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold truncate">
                {nombreCompleto}
              </h1><br />
              <p className="text-sm text-reducar-text-secondary truncate">
                {user.email}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-reducar-primary-light text-reducar-primary font-semibold">
                  {user.rolId === 1 ? "Administrador" : "Usuario"}
                </span>
                {user.esta_activo === false ? (
                  <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 font-semibold">
                    Cuenta desactivada
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 font-semibold">
                    Cuenta activa
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Mensajes ===== */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-green-500/10 text-green-600 text-sm">
            {successMsg}
          </div>
        )}
        {serverError && (
          <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
            {serverError}
          </div>
        )}

        {/* ===== Form: foto + nombre + apellido ===== */}
        {activeForm === "photo" && (
          <form
            onSubmit={photoForm.handleSubmit(onPhotoSubmit)}
            noValidate
            className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-lg space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold">
                  Foto, nombre y apellido
                </h2>
                <p className="text-xs text-reducar-text-secondary mt-0.5">
                  El correo electrónico no puede modificarse.
                </p>
              </div>
              <button
                type="button"
                onClick={tryCancelForm}
                className="text-xs text-reducar-text-secondary hover:text-reducar-primary transition-colors"
              >
                Cerrar
              </button>
            </div>

            {/* Campo de archivo */}
            <div>
              <label
                htmlFor="photo-file"
                className="block mb-1.5 text-sm font-bold text-reducar-text"
              >
                Foto de perfil
              </label>
              <input
                id="photo-file"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="w-full text-sm text-reducar-text file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-reducar-primary file:text-white file:font-bold hover:file:bg-reducar-primary-dark file:cursor-pointer file:transition-colors"
              />
              <p className="mt-1 text-xs text-reducar-text-secondary">
                PNG, JPG o WEBP. Máximo 2 MB.
              </p>

              {/* Previsualización del archivo seleccionado */}
              {filePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={filePreview}
                    alt="Previsualización"
                    className="w-16 h-16 rounded-full object-cover border-2 border-reducar-primary"
                  />
                  <button
                    type="button"
                    onClick={clearFilePreview}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Quitar imagen
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Nombre"
                id="photo-nombre"
                error={photoForm.formState.errors.nombre?.message}
                {...photoForm.register("nombre")}
              />
              <InputField
                label="Apellido"
                id="photo-apellido"
                error={photoForm.formState.errors.apellido?.message}
                {...photoForm.register("apellido")}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={photoForm.formState.isSubmitting}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors disabled:opacity-60"
              >
                {photoForm.formState.isSubmitting
                  ? "Guardando…"
                  : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={tryCancelForm}
                disabled={photoForm.formState.isSubmitting}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl border border-reducar-border text-reducar-text font-bold hover:bg-reducar-surface-soft transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* ===== Form: perfil extendido ===== */}
        {activeForm === "profile" && (
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            noValidate
            className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-lg space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-extrabold">Editar perfil</h2>
              <button
                type="button"
                onClick={tryCancelForm}
                className="text-xs text-reducar-text-secondary hover:text-reducar-primary transition-colors"
              >
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Fecha de nacimiento"
                id="profile-fecha"
                type="date"
                error={
                  profileForm.formState.errors.fecha_nacimiento?.message
                }
                {...profileForm.register("fecha_nacimiento")}
              />
              <InputField
                label="Ubicación"
                id="profile-ubicacion"
                placeholder="Ciudad, país"
                error={profileForm.formState.errors.ubicacion?.message}
                {...profileForm.register("ubicacion")}
              />
            </div>

            <div>
              <label
                htmlFor="profile-biografia"
                className="block mb-1.5 text-sm font-bold"
              >
                Biografía
              </label>
              <textarea
                id="profile-biografia"
                rows={4}
                placeholder="Contá algo sobre vos…"
                {...profileForm.register("biografia")}
                className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all resize-none"
              />
              {profileForm.formState.errors.biografia?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {profileForm.formState.errors.biografia.message}
                </p>
              )}
            </div>

            <InputField
              label="Preferencia"
              id="profile-preferencia"
              placeholder="Ej: cursos cortos, datos, diseño…"
              error={
                profileForm.formState.errors.user_preferencia?.message
              }
              {...profileForm.register("user_preferencia")}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors disabled:opacity-60"
              >
                {profileForm.formState.isSubmitting
                  ? "Guardando…"
                  : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={tryCancelForm}
                disabled={profileForm.formState.isSubmitting}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl border border-reducar-border text-reducar-text font-bold hover:bg-reducar-surface-soft transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* ===== Vista de solo lectura ===== */}
        {activeForm === null && (
          <section className="bg-reducar-surface p-6 sm:p-8 rounded-3xl border border-reducar-border shadow-lg">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-extrabold">
                  Información personal
                </h2>
                <p className="text-xs text-reducar-text-secondary mt-0.5">
                  Estos son los datos asociados a tu cuenta.
                </p>
              </div>
              <button
                type="button"
                onClick={() => tryOpenForm("profile")}
                className="shrink-0 inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-reducar-primary text-reducar-primary text-sm font-bold hover:bg-reducar-primary/10 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Editar perfil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoField
                label="Fecha de nacimiento"
                value={user.fecha_nacimiento}
              />
              <InfoField label="Ubicación" value={user.ubicacion} />
              <div className="md:col-span-2">
                <InfoField
                  label="Biografía"
                  value={user.biografia}
                  multiline
                />
              </div>
              <InfoField label="Preferencia" value={user.user_preferencia} />
              <InfoField label="Correo" value={user.email} />
            </div>

            <div className="mt-8 pt-6 border-t border-reducar-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-reducar-text-secondary">
              <span>
                <strong className="text-reducar-text">Registrado:</strong>{" "}
                {formatFecha(user.fecha_registro)}
              </span>
              <span>
                <strong className="text-reducar-text">
                  Última actualización:
                </strong>{" "}
                {formatFecha(user.fecha_actualizacion)}
              </span>
            </div>
          </section>
        )}
      </div>

      {/* ===== Modal de cambios sin guardar ===== */}
      {showDiscardModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm px-4 animate-[fadeIn_0.15s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="discard-title"
        >
          <div className="w-full max-w-md bg-reducar-surface rounded-2xl border border-reducar-border shadow-2xl p-6 animate-[dropdownIn_0.15s_ease-out]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/15 grid place-items-center shrink-0">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div>
                <h3 id="discard-title" className="text-lg font-extrabold">
                  ¿Descartar cambios?
                </h3>
                <p className="text-sm text-reducar-text-secondary mt-1">
                  Tenés cambios sin guardar. Si salís ahora, se perderán.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={handleKeepEditing}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl border border-red-500/40 text-red-500 font-bold hover:bg-red-500/10 transition-colors"
              >
                Descartar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================
// Helpers de presentación
// =============================

interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
  error?: string;
}

const InputField = ({ label, id, error, ...rest }: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1.5 text-sm font-bold text-reducar-text"
    >
      {label}
    </label>
    <input
      id={id}
      {...rest}
      className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

function InfoField({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string | null;
  multiline?: boolean;
}) {
  const hasValue = !!value?.trim();
  return (
    <div>
      <p className="text-[11px] font-extrabold tracking-wider uppercase text-reducar-text-secondary mb-1.5">
        {label}
      </p>
      <p
        className={`text-sm text-reducar-text ${
          multiline ? "whitespace-pre-line leading-relaxed" : ""
        }`}
      >
        {hasValue ? (
          value
        ) : (
          <span className="italic opacity-50">Sin completar</span>
        )}
      </p>
    </div>
  );
}

function formatFecha(iso: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}