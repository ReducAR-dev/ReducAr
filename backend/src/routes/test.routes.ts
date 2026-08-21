// backend/src/routes/test.routes.ts
import { Router } from 'express';
import { testSupabaseConnection } from '../controllers/test.controller.js';

const router = Router();

// Ruta GET para probar la conexión
// Cuando alguien visite /api/test, se ejecutará el controlador
router.get('/test', testSupabaseConnection);

export default router;