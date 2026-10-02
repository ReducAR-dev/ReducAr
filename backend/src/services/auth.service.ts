import { supabase } from '../config/supabase';
import { userService } from './user.service';
import { usuario } from '../models/usuario';

export class AuthService {
  /**
   * Registra un nuevo usuario en Supabase Auth y crea su perfil correspondiente en nuestra tabla "usuario".
   * Esto mantiene la consistencia e integridad de los datos.
   */
  async signUp(
    email: string,
    password: string,
    nombre: string,
    apellido?: string,
    fechaNacimiento?: string
  ): Promise<{ authUser: any; dbUser: usuario }> {
    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new Error(`Error en el registro de autenticación: ${authError.message}`);
    }

    if (!authData.user) {
      throw new Error('No se pudo crear el usuario en el servicio de autenticación.');
    }

    // 2. Guardar información en nuestra tabla interna de usuarios vinculándolo con el ID de Auth
    try {
      const dbUser = await userService.createUser({
        id: authData.user.id,
        nombre,
        apellido: apellido ?? null,
        email,
        fechaNacimiento: fechaNacimiento ?? null,
        rolId: 2, // Por defecto rol general 'user'
        estaActivo: true,
      });

      return { authUser: authData.user, dbUser };
    } catch (dbError: any) {
      // Manejo de error: Si falla el guardado en nuestra BD, se podría de forma ideal remover de Supabase Auth
      // para evitar estados inconsistentes (usuarios huérfanos). Para este nivel, lanzamos el error para que sea capturado.
      throw new Error(`Usuario autenticado, pero falló el registro en la base de datos interna: ${dbError.message}`);
    }
  }

  /**
   * Logea un usuario utilizando Supabase Auth
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }

    // Validar si el usuario está activo en nuestra base de datos interna
    const internalUser = await userService.getUserById(data.user.id);
    if (!internalUser || !internalUser.estaActivo) {
      // Si está inactivo, cerramos la sesión de inmediato por seguridad
      await this.signOut();
      throw new Error('Esta cuenta ha sido desactivada o no está registrada.');
    }

    return { session: data.session, user: internalUser };
  }

  /**
   * Cierra la sesión activa en Supabase Auth
   */
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
  }

  /**
   * Verifica la sesión activa de forma segura
   * Utiliza el token JWT provisto para comprobar validez e identidad con Supabase Auth
   */
  async verifySession(accessToken: string): Promise<usuario> {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      throw new Error('Token inválido o sesión expirada.');
    }

    // Buscar en nuestra base de datos y verificar estado
    const dbUser = await userService.getUserById(user.id);
    if (!dbUser) {
      throw new Error('Usuario no registrado en la base de datos interna.');
    }

    if (!dbUser.estaActivo) {
      throw new Error('Esta cuenta ha sido desactivada.');
    }

    return dbUser;
  }
}

export const authService = new AuthService();
