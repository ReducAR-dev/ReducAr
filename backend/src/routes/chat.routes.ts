import { Router } from 'express';

import {
  postChatEscalation,
  postChatMessage,
} from '../controllers/chat.controller.js';
import {
  chatEscalationRateLimit,
  chatRateLimit,
} from '../middlewares/chat.middleware.js';

const router = Router();

router.post('/', chatRateLimit, postChatMessage);
router.post('/escalate', chatEscalationRateLimit, postChatEscalation);

router.all('/', (_req, res) => {
  res.status(405).json({
    success: false,
    error: 'METHOD_NOT_ALLOWED',
    message: 'Método no permitido para este endpoint.',
  });
});

router.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'CHAT_ROUTE_NOT_FOUND',
    message: 'La ruta solicitada no existe.',
  });
});

export default router;
