
import { Request, Response } from 'express';
import { obtenerTodosLosCursos, obtenerCursoPorId } from '../services/cursos.services';
import { Curso } from '../models/cursos';

// Controlador para manejar la solicitud GET a la ruta /cursos

export const getCursos = async (req: Request, res: Response): Promise<void> => {

  try {
    const cursos = await obtenerTodosLosCursos();
    res.status(200).json(cursos);
  } catch (error) {
    console.error('Error en getCursos:', error);
    res.status(500).json({ message: 'Error al obtener los cursos' });
  } 

};

// Controlador para manejar la solicitud GET a la ruta /cursos/:id

export const getCursoPorId = async (req: Request, res: Response): Promise<void> => {

  try {
      const id = Number(req.params.id);

      // Pendiente de implementación : Validación correcta de id 
      
      if ( isNaN(id) ||  id <= 0 || !Number.isInteger(id) ) {
          res.status(400).json({ message: 'ID inválido' });
          return;
      }
      
      const curso : Curso | null = await obtenerCursoPorId(id); 
      
      if (curso) {
          res.status(200).json(curso);
      } else {
          res.status(404).json({ message: 'Curso no encontrado' });
      }
  }catch (error) {
      console.error('Error en getCursoPorId:', error);
      res.status(500).json({ message: 'Error al obtener el curso'});
  }
 
};





export const postCurso = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ mensaje: 'No implementado' })
} 


export const patchCurso = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ mensaje: 'No implementado' })
}

export const deleteCurso = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({ mensaje: 'No implementado' })
}