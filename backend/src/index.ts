import cursoRoutes from './routes/curso.routes'; // Importamos las rutas de cursos
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testRoutes from './routes/test.routes.js'; // Importamos las rutas de prueba

// Carga las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba para Supabase
app.use('/api', testRoutes);

// Ruta de inicio simple
app.get('/', (req, res) => {
  res.send('🚀 Servidor Backend de ReducAr funcionando!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🧪 Prueba la conexión a Supabase en: http://localhost:${PORT}/api/test`);
});