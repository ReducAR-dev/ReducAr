import type { Request, Response } from 'express';

import {
  ChatServiceError,
  createChatResponse,
} from '../services/chat.service.js';
import type {
  ChatConversationMessage,
  ChatErrorResponse,
  ChatRequest,
  ChatResponse,
} from '../types/chat.types.js';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 8;
const MAX_TOTAL_CONTENT_LENGTH = 6000;

type ChatControllerResponse = ChatResponse | ChatErrorResponse;

const sendValidationError = (
  res: Response<ChatControllerResponse>,
  message: string,
): void => {
  res.status(400).json({
    error: 'INVALID_MESSAGE',
    message,
  });
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseConversationHistory = (
  value: unknown,
): ChatConversationMessage[] | null => {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.length > MAX_HISTORY_MESSAGES) {
    return null;
  }

  const messages: ChatConversationMessage[] = [];

  for (const item of value) {
    if (!isRecord(item)) {
      return null;
    }

    const keys = Object.keys(item);

    if (
      keys.length !== 2 ||
      !keys.includes('role') ||
      !keys.includes('content') ||
      (item.role !== 'user' && item.role !== 'assistant') ||
      typeof item.content !== 'string'
    ) {
      return null;
    }

    const content = item.content.trim();

    if (!content || content.length > MAX_MESSAGE_LENGTH) {
      return null;
    }

    messages.push({ role: item.role, content });
  }

  return messages;
};

export const postChatMessage = async (
  req: Request<unknown, ChatControllerResponse, unknown>,
  res: Response<ChatControllerResponse>,
): Promise<void> => {
  if (!isRecord(req.body)) {
    sendValidationError(res, 'El cuerpo de la solicitud debe ser un objeto JSON.');
    return;
  }

  const unexpectedProperties = Object.keys(req.body).filter(
    (key) => key !== 'message' && key !== 'messages',
  );

  if (unexpectedProperties.length > 0) {
    sendValidationError(res, 'La solicitud contiene propiedades no permitidas.');
    return;
  }

  const message = req.body.message;

  if (typeof message !== 'string') {
    sendValidationError(res, 'El campo "message" es obligatorio y debe ser un string.');
    return;
  }

  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    sendValidationError(res, 'El campo "message" no puede estar vacío.');
    return;
  }

  if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
    sendValidationError(
      res,
      `El campo "message" no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
    );
    return;
  }

  const messages = parseConversationHistory(req.body.messages);

  if (messages === null) {
    sendValidationError(
      res,
      'El historial debe contener como máximo 8 mensajes válidos.',
    );
    return;
  }

  const totalContentLength = messages.reduce(
    (total, historyMessage) => total + historyMessage.content.length,
    normalizedMessage.length,
  );

  if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
    sendValidationError(
      res,
      'El contenido total de la conversación no puede superar los 6000 caracteres.',
    );
    return;
  }

  try {
    const response = await createChatResponse({
      message: normalizedMessage,
      ...(messages.length > 0 ? { messages } : {}),
    });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ChatServiceError) {
      console.error('Error del chatbot:', error.code);
      res.status(503).json({
        error: 'CHAT_PROVIDER_UNAVAILABLE',
        message: 'El asistente no está disponible temporalmente.',
      });
      return;
    }

    console.error('Error del chatbot: UNEXPECTED');
    res.status(500).json({
      error: 'CHAT_SERVICE_ERROR',
      message: 'No pudimos procesar tu consulta.',
    });
  }
};
