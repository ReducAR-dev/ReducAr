export function validateInstitucion(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID (texto)');
  if (typeof data.nombre !== 'string' || data.nombre.trim() === '') errors.push('nombre debe ser texto no vacío');
  if (typeof data.estaVerificada !== 'boolean') errors.push('estaVerificada debe ser un booleano');
  // ... añadir más validaciones según db.sql
  return errors;
}
