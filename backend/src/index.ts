import express from 'express';
import cursoRoutes from './routes/curso.routes'; // Importamos las rutas de cursos

// Creamos una instancia de la aplicación Express
// Configuramos el puerto en el que escuchará el servidor

const app = express();
const PORT = process.env.PORT || 3000;


// Configuramos el middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Usamos las rutas de cursos para cualquier solicitud que comience con /cursos
app.use('/cursos', cursoRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});