import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export class UserController {
  private getParamId(req: Request): string | null {
    const { id } = req.params;
    if (Array.isArray(id)) {
      return id[0] ?? null;
    }

    return id ?? null;
  }

  /**
   * Obtiene un usuario por su UUID
   */
  async getByUuid(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getParamId(req);
      if (!id) {
        return res.status(400).json({ error: 'El ID del usuario es requerido' });
      }

      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Verifica si un usuario existe en la base de datos por su correo
   */
  async checkByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'El email es requerido' });
      }

      const users = await userService.listUsers(false);
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

      return res.status(200).json({ exists: userExists });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Actualiza los datos de un usuario de forma segura
   */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getParamId(req);
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({ error: 'El ID del usuario es requerido' });
      }

      // REGLA DE NEGOCIO: Nadie puede ser jamás de rolId = 1 (Admin) a través de controladores públicos
      if (updateData.rolId === 1) {
        updateData.rolId = 2; // Forzar a rolId = 2 (User)
      }

      const updatedUser = await userService.updateUser(id, updateData);
      return res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Realiza la baja lógica (desactivación) de un usuario
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getParamId(req);
      if (!id) {
        return res.status(400).json({ error: 'El ID del usuario es requerido' });
      }

      await userService.deleteUser(id);
      return res.status(200).json({ message: 'Usuario desactivado con éxito' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtiene la lista de usuarios
   */
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.listUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
