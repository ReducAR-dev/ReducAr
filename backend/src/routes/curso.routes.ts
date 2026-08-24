import { Router } from 'express';
import * as cursoController   from '../controllers/curso.controller';
// el router de express nos permite definir rutas y asociarlas con controladores

const router = Router();


router.get('/', cursoController.getCursos);

// obtener un curso     
router.get('/:id', cursoController.getCursoPorId);

// crear un curso
router.post('/', cursoController.postCurso); 

// actualizar un curso 
router.patch('/:id', cursoController.patchCurso);

// eliminar un curso 
router.delete('/:id', cursoController.deleteCurso);

// exportamos el router para que pueda ser usado en otros archivos 
export default router;

