import type {
  ErrorRequestHandler,
  RequestHandler,
} from 'express';

import type { ChatErrorResponse } from '../types/chat.types.js';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const ESCALATION_RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const ESCALATION_RATE_LIMIT_MAX_REQUESTS = 3;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const createRateLimit = (
  windowMs: number,
  maxRequests: number,
  message: string,
): RequestHandler<unknown, ChatErrorResponse> => {
  const requestsByIp = new Map<string, RateLimitEntry>();

  return (req, res, next): void => {
    const now = Date.now();
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const currentEntry = requestsByIp.get(ip);
    const entry =
      !currentEntry || currentEntry.resetAt <= now
        ? { count: 0, resetAt: now + windowMs }
        : currentEntry;

    res.setHeader('RateLimit-Limit', maxRequests);
    res.setHeader(
      'RateLimit-Reset',
      Math.ceil((entry.resetAt - now) / 1_000),
    );

    if (entry.count >= maxRequests) {
      res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1_000));
      res.status(429).json({
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message,
      });
      return;
    }

    entry.count += 1;
    requestsByIp.set(ip, entry);
    res.setHeader('RateLimit-Remaining', maxRequests - entry.count);

    if (requestsByIp.size >= 1_000) {
      for (const [storedIp, storedEntry] of requestsByIp) {
        if (storedEntry.resetAt <= now) {
          requestsByIp.delete(storedIp);
        }
      }
    }

    next();
  };
};

export const chatRateLimit = createRateLimit(
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  'Realizaste demasiadas consultas. Intentá nuevamente en un minuto.',
);

export const chatEscalationRateLimit = createRateLimit(
  ESCALATION_RATE_LIMIT_WINDOW_MS,
  ESCALATION_RATE_LIMIT_MAX_REQUESTS,
  'Realizaste demasiados envíos. Intentá nuevamente más tarde.',
);

const isJsonSyntaxError = (error: unknown): boolean =>
  error instanceof SyntaxError &&
  typeof error === 'object' &&
  error !== null &&
  'body' in error;

const isPayloadTooLargeError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'type' in error &&
  error.type === 'entity.too.large';

export const chatErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): void => {
  if (req.path !== '/api/chat' && !req.path.startsWith('/api/chat/')) {
    next(error);
    return;
  }

  if (isPayloadTooLargeError(error)) {
    res.status(413).json({
      success: false,
      error: 'INVALID_MESSAGE',
      message: 'El cuerpo de la solicitud es demasiado grande.',
    });
    return;
  }

  if (isJsonSyntaxError(error)) {
    res.status(400).json({
      success: false,
      error: 'INVALID_MESSAGE',
      message: 'El cuerpo de la solicitud debe contener JSON válido.',
    });
    return;
  }

  console.error('Error del chatbot: MIDDLEWARE_UNEXPECTED');
  res.status(500).json({
    success: false,
    error: 'CHAT_SERVICE_ERROR',
    message: 'No pudimos procesar tu consulta.',
  });
};
