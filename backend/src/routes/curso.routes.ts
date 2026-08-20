import { Router } from 'express';
import { getCursos } from '../controllers/curso.controller';

// el router de express nos permite definir rutas y asociarlas con controladores

const router = Router();

// conecta la ruta GET /cursos con el controlador getCursos 

router.get('/', getCursos);

// exportamos el router para que pueda ser usado en otros archivos 
export default router;