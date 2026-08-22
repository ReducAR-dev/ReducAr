import { Router } from 'express';

import { postChatMessage } from '../controllers/chat.controller.js';
import { chatRateLimit } from '../middlewares/chat.middleware.js';

const router = Router();

router.post('/', chatRateLimit, postChatMessage);

router.all('/', (_req, res) => {
  res.status(405).json({
    error: 'METHOD_NOT_ALLOWED',
    message: 'Método no permitido para este endpoint.',
  });
});

router.use((_req, res) => {
  res.status(404).json({
    error: 'CHAT_ROUTE_NOT_FOUND',
    message: 'La ruta solicitada no existe.',
  });
});

export default router;
