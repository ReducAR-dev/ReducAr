export function validateValoracion(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');

  // COMENTARIO: La puntuación debe estar entre 1 y 5 por CHECK CONSTRAINT en la DB
  if (typeof data.puntuacion !== 'number' || data.puntuacion < 1 || data.puntuacion > 5) {
    errors.push('puntuacion debe ser un número entero entre 1 y 5');
  }

  if (typeof data.estaActiva !== 'boolean') errors.push('estaActiva debe ser booleano');
  if (typeof data.estaAprobada !== 'boolean') errors.push('estaAprobada debe ser booleano');
  return errors;
}
