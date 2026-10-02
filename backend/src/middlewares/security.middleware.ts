import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const rateLimitMap: RateLimitStore = {};
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS_PER_WINDOW = 100; // Máximo 100 peticiones por ventana de 15 minutos

/**
 * Middleware General de Limitación de Tasa (Rate Limiter)
 * Previene ataques de denegación de servicio (DoS) o fuerza bruta
 */
export function globalRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  if (!rateLimitMap[ip]) {
    rateLimitMap[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
  } else {
    if (now > rateLimitMap[ip].resetTime) {
      rateLimitMap[ip].count = 1;
      rateLimitMap[ip].resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
      rateLimitMap[ip].count += 1;
    }
  }

  if (rateLimitMap[ip].count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Por favor, intente de nuevo más tarde.',
    });
  }

  next();
}

/**
 * Sanitiza recursivamente objetos de entrada para prevenir Inyecciones
 */
function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    // Elimina etiquetas script e inyecciones peligrosas básicas
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .trim();
  }
  if (typeof value === 'object' && value !== null) {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        value[key] = sanitizeValue(value[key]);
      }
    }
  }
  return value;
}

/**
 * Middleware de Sanitización General para evitar vulnerabilidades de script o caracteres maliciosos
 */
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
}

/**
 * Middleware de Cabeceras de Seguridad Básicas
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}
