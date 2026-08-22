import type {
  ErrorRequestHandler,
  RequestHandler,
} from 'express';

import type { ChatErrorResponse } from '../types/chat.types.js';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const requestsByIp = new Map<string, RateLimitEntry>();

const removeExpiredEntries = (now: number): void => {
  if (requestsByIp.size < 1_000) {
    return;
  }

  for (const [ip, entry] of requestsByIp) {
    if (entry.resetAt <= now) {
      requestsByIp.delete(ip);
    }
  }
};

export const chatRateLimit: RequestHandler<
  unknown,
  ChatErrorResponse
> = (req, res, next): void => {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const currentEntry = requestsByIp.get(ip);
  const entry =
    !currentEntry || currentEntry.resetAt <= now
      ? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
      : currentEntry;

  res.setHeader('RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
  res.setHeader(
    'RateLimit-Reset',
    Math.ceil((entry.resetAt - now) / 1_000),
  );

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1_000));
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Realizaste demasiadas consultas. Intentá nuevamente en un minuto.',
    });
    return;
  }

  entry.count += 1;
  requestsByIp.set(ip, entry);
  res.setHeader('RateLimit-Remaining', RATE_LIMIT_MAX_REQUESTS - entry.count);
  removeExpiredEntries(now);
  next();
};

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
      error: 'INVALID_MESSAGE',
      message: 'El cuerpo de la solicitud es demasiado grande.',
    });
    return;
  }

  if (isJsonSyntaxError(error)) {
    res.status(400).json({
      error: 'INVALID_MESSAGE',
      message: 'El cuerpo de la solicitud debe contener JSON válido.',
    });
    return;
  }

  console.error('Error del chatbot: MIDDLEWARE_UNEXPECTED');
  res.status(500).json({
    error: 'CHAT_SERVICE_ERROR',
    message: 'No pudimos procesar tu consulta.',
  });
};
