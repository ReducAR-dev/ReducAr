// src/middlewares/upload.middleware.ts
import multer from "multer";

/**
 * Guarda el archivo en memoria (buffer) en vez de disco.
 * Ventajas:
 *  - No ensucia el disco del servidor con archivos temporales.
 *  - El buffer se pasa directo a Supabase Storage.
 *  - Funciona en Render/Vercel sin sistema de archivos persistente.
 */
const storage = multer.memoryStorage();

/**
 * Filtro de tipos MIME aceptados.
 * Coincide con los "Allowed MIME types" del bucket `avatars` en Supabase.
 */
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(new Error("Formato de imagen no permitido. Usá PNG, JPG o WEBP."));
    return;
  }
  cb(null, true);
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB, coincide con el límite del bucket
    files: 1,                   // un solo archivo
  },
}).single("avatar"); // el campo se llama "avatar" en el FormData