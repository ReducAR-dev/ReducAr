import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatErrorHandler } from './middlewares/chat.middleware.js';
import chatRoutes from './routes/chat.routes.js';
import cursoRoutes from './routes/curso.routes.js'; // Importamos las rutas de cursos
import testRoutes from './routes/test.routes.js'; // Importamos las rutas de prueba

// Carga las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGINS = new Set(
  (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
);
const LOCAL_DEVELOPMENT_ORIGIN =
  /^http:\/\/(?:localhost|127\.0\.0\.1):\d{2,5}$/u;

const isAllowedFrontendOrigin = (origin: string): boolean =>
  FRONTEND_ORIGINS.has(origin) ||
  (process.env.NODE_ENV !== 'production' &&
    LOCAL_DEVELOPMENT_ORIGIN.test(origin));

// Middlewares básicos
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || isAllowedFrontendOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
}));
app.use(express.json());

// Chatbot de asistencia
app.use('/api/chat', chatRoutes);

// Ruta de prueba para Supabase
app.use('/api', testRoutes);

// Ruta de inicio simple
app.get('/', (req, res) => {
  res.send('🚀 Servidor Backend de ReducAr funcionando!');
});
app.use('/cursos', cursoRoutes);

// Evita que los errores del chatbot expongan respuestas HTML o detalles internos
app.use(chatErrorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🧪 Prueba la conexión a Supabase en: http://localhost:${PORT}/api/test`);
});
