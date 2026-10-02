import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { userService } from '../services/user.service';

// Extender la interfaz de Request de Express para incluir 'user'
export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Middleware para requerir autenticación vía Token Bearer (Supabase JWT)
 * Desconfía siempre y valida directamente con Supabase Auth
 */
export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado o inválido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token malformado.' });
    }

    // Verificar firma y autenticidad del token directamente con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido o sesión expirada.' });
    }

    // Verificar estado activo en nuestra base de datos
    const dbUser = await userService.getUserById(user.id);
    if (!dbUser || !dbUser.estaActivo) {
      return res.status(403).json({ error: 'Cuenta de usuario inactiva o no registrada.' });
    }

    // Adjuntar usuario verificado a la request
    req.user = dbUser;
    next();
  } catch (err: any) {
    return res.status(500).json({ error: `Error de autenticación: ${err.message}` });
  }
}

/**
 * Middleware para exigir que el usuario sea exclusivamente Administrador (rolId === 1)
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado.' });
  }

  if (req.user.rolId !== 1) {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }

  next();
}

/**
 * Middleware de Seguridad Anti-Escalación de Privilegios:
 * Evita que cualquier usuario intente asignarse o modificar un rolId a 1 (Admin)
 */
export function preventAdminEscalation(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    if (req.body.rolId === 1) {
      // Regla estricta: cambiar forzosamente a 2 o rechazar la petición
      req.body.rolId = 2;
    }
  }
  next();
}
