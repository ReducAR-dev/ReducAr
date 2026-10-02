import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  /**
   * Registro seguro de un nuevo usuario
   */
  async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, nombre, apellido, fechaNacimiento, rolId } = req.body;

      if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Email, contraseña y nombre son campos obligatorios.' });
      }

      // REGLA DE NEGOCIO: Ningún usuario creado por este método podrá tener rolId = 1 (Admin)
      if (rolId === 1) {
        return res.status(403).json({ error: 'No está permitido registrar usuarios con privilegios de administrador.' });
      }

      const result = await authService.signUp(email, password, nombre, apellido, fechaNacimiento);

      return res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: result.dbUser,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Inicio de sesión seguro
   */
  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
      }

      const result = await authService.signIn(email, password);

      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        session: result.session,
        user: result.user,
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  /**
   * Cierre de sesión
   */
  async signOut(req: Request, res: Response): Promise<Response> {
    try {
      await authService.signOut();
      return res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Verificación de sesión mediante Token de Acceso (Bearer Token)
   */
  async verifySession(req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de acceso no provisto o con formato incorrecto.' });
      }

      const token = authHeader.slice('Bearer '.length).trim();
      if (!token) {
        return res.status(401).json({ error: 'Token de acceso no provisto o con formato incorrecto.' });
      }

      const user = await authService.verifySession(token);

      return res.status(200).json({
        message: 'Sesión válida',
        user,
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
