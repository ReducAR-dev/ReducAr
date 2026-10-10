// src/types/common.types.ts

/** UUID v4 como string (viene de Supabase Auth). */
export type UUID = string;

/** Fecha ISO 8601 (ej: "2026-10-10T14:30:00Z"). */
export type ISODateString = string;

/** Fecha en formato YYYY-MM-DD (para columnas `date` de SQL). */
export type ISODateOnly = string;

/** Timestamp de PostgreSQL como string ISO que devuelve Supabase. */
export type Timestamp = string;