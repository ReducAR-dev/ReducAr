
import { Request, Response } from 'express';

// Controlador para manejar la solicitud GET a la ruta /cursos

export const getCursos = (req: Request, res: Response): void => {
  res.status(200).json({

    mensaje: "Endpoint GET /cursos funcionando correctamente"
  });
};


