export function validateRutaAprendizaje(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo es requerido');
  if (typeof data.descripcion !== 'string' || data.descripcion.trim() === '') errors.push('descripcion es requerida');
  if (typeof data.nivelId !== 'number') errors.push('nivelId debe ser un número');
  if (typeof data.esPredeterminada !== 'boolean') errors.push('esPredeterminada debe ser un booleano');
  if (typeof data.estaActiva !== 'boolean') errors.push('estaActiva debe ser un booleano');
  return errors;
}
