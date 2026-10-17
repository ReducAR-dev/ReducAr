/**
 * Tipos base que describen cómo se guardan los datos en la BD.
 * No representan contratos de operación; eso vive en `types/`.
 */

export type UUID = string;
export type Timestamp = string;       // ISO 8601 completo
export type ISODateOnly = string;     // "YYYY-MM-DD"