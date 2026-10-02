export function validateUsuario(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') {
    return ['El dato proporcionado debe ser un objeto'];
  }
  if (typeof data.id !== 'string') errors.push('id debe ser un UUID (texto)');
  if (typeof data.nombre !== 'string' || data.nombre.trim() === '') errors.push('nombre debe ser un texto no vacío');
  // apellido es opcional
  if (data.apellido !== null && typeof data.apellido !== 'string') errors.push('apellido debe ser texto o nulo');
  if (typeof data.email !== 'string' || data.email.trim() === '') errors.push('email debe ser un texto no vacío');
  // fechaNacimiento es date opcional (string)
  // fechaRegistro y fechaActualizacion son timestamp (string)
  if (typeof data.rolId !== 'number') errors.push('rolId debe ser un número');
  if (typeof data.estaActivo !== 'boolean') errors.push('estaActivo debe ser un booleano');

  // TODO: validar formato de fechaNacimiento, fechaRegistro, fechaActualizacion
  return errors;
}
