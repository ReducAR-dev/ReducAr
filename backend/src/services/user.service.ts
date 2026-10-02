import { supabase } from '../config/supabase';
import { usuario } from '../models/usuario';

export class UserService {
  /**
   * Obtiene un usuario de la base de datos por su ID (UUID)
   */
  async getUserById(id: string): Promise<usuario | null> {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // PGRST116 = No rows returned
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }

    return data as usuario;
  }

  /**
   * Crea un nuevo registro de usuario en nuestra tabla de la base de datos
   */
  async createUser(userData: Partial<usuario>): Promise<usuario> {
    const { data, error } = await supabase
      .from('usuario')
      .insert([
        {
          id: userData.id,
          nombre: userData.nombre,
          apellido: userData.apellido,
          email: userData.email,
          fechaNacimiento: userData.fechaNacimiento,
          fotoPerfil: userData.fotoPerfil,
          biografia: userData.biografia,
          ubicacion: userData.ubicacion,
          rolId: userData.rolId ?? 2, // Por defecto rol 2 (User)
          estaActivo: userData.estaActivo ?? true,
          fechaRegistro: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear usuario en BD: ${error.message}`);
    }

    return data as usuario;
  }

  /**
   * Actualiza la información de un usuario
   */
  async updateUser(id: string, userData: Partial<usuario>): Promise<usuario> {
    const { data, error } = await supabase
      .from('usuario')
      .update({
        ...userData,
        fechaActualizacion: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }

    return data as usuario;
  }

  /**
   * Desactiva (o elimina lógicamente) un usuario
   */
  async deleteUser(id: string): Promise<void> {
    // Desactivamos el usuario en lugar de borrarlo físicamente para mantener integridad referencial
    const { error } = await supabase
      .from('usuario')
      .update({ estaActivo: false, fechaActualizacion: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar (desactivar) usuario: ${error.message}`);
    }
  }

  /**
   * Lista todos los usuarios (opcionalmente filtrando activos)
   */
  async listUsers(onlyActive: boolean = true): Promise<usuario[]> {
    let query = supabase.from('usuario').select('*');
    if (onlyActive) {
      query = query.eq('estaActivo', true);
    }
    const { data, error } = await query;

    if (error) {
      throw new Error(`Error al listar usuarios: ${error.message}`);
    }

    return data as usuario[];
  }
}

export const userService = new UserService();
