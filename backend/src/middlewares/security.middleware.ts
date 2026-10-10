// src/middlewares/security.middleware.ts
import type { Request, Response, NextFunction } from "express";

/**
 * Rate limiting simple en memoria.
 *
 * ⚠️ Para producción real, usa `express-rate-limit` con store en Redis.
 *    Este es suficiente para desarrollo y proyectos pequeños.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;

export function globalRateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.ip ||
    req.socket.remoteAddress ||
    "unknown";
  const now = Date.now();

  // Limpieza perezosa: si el mapa crece mucho, purgamos entradas viejas.
  if (rateLimitMap.size > 5000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
    if (entry.count > MAX_REQUESTS_PER_WINDOW) {
      res.status(429).json({
        success: false,
        error: "Demasiadas solicitudes. Intentá de nuevo más tarde.",
      });
      return;
    }
  }

  next();
}

/**
 * Cabeceras de seguridad básicas.
 * En producción podrías reemplazarlo por `helmet`.
 */
export function securityHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
}