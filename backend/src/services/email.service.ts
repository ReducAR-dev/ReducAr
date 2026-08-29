import type { EscalateRequest } from '../types/chat.types.js';

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const DEFAULT_TIMEOUT_MS = 10_000;

export type EmailServiceErrorCode =
  | 'CONFIGURATION'
  | 'TIMEOUT'
  | 'UNAVAILABLE';

export class EmailServiceError extends Error {
  constructor(readonly code: EmailServiceErrorCode) {
    super(code);
    this.name = 'EmailServiceError';
  }
}

interface EmailServiceOptions {
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const normalizePlainText = (value: string): string =>
  value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();

const formatSupportEmail = (request: EscalateRequest): string => {
  const date = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(new Date());

  return [
    'Nueva consulta recibida desde el chatbot.',
    '',
    'Nombre:',
    request.name ? normalizePlainText(request.name) : 'No informado',
    '',
    'Email:',
    normalizePlainText(request.email),
    '',
    'Consulta:',
    normalizePlainText(request.message),
    '',
    'Fecha:',
    date,
    '',
    'Origen:',
    'Chatbot ReducAR',
  ].join('\n');
};

export const sendSupportEmail = async (
  request: EscalateRequest,
  options: EmailServiceOptions = {},
): Promise<void> => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const supportEmail = process.env.SUPPORT_EMAIL?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !supportEmail || !fromEmail) {
    throw new EmailServiceError('CONFIGURATION');
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  try {
    const response = await (options.fetchImplementation ?? fetch)(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ReducAR-Backend/1.0',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [supportEmail],
        subject: 'Nueva consulta desde el chatbot de ReducAR',
        text: formatSupportEmail(request),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new EmailServiceError('UNAVAILABLE');
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || typeof payload.id !== 'string' || !payload.id) {
      throw new EmailServiceError('UNAVAILABLE');
    }
  } catch (error) {
    if (error instanceof EmailServiceError) {
      throw error;
    }

    if (controller.signal.aborted) {
      throw new EmailServiceError('TIMEOUT');
    }

    throw new EmailServiceError('UNAVAILABLE');
  } finally {
    clearTimeout(timeout);
  }
};
