
import { Request, Response } from 'express';
import { obtenerTodosLosCursos, obtenerCursoPorId } from '../services/cursos.services';
import { Curso } from '../types/curso.types';

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

// esqueleto de código - A completar 
export const getCursoPorId = async (req: Request, res: Response): Promise<void> => {

  try {
      const id = Number(req.params.id);
      // Validación pendiente de id 

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