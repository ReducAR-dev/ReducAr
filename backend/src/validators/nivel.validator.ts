export function validateNivel(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') {
    return ['El dato proporcionado debe ser un objeto'];
  }
  if (typeof data.id !== 'number') {
    errors.push('id debe ser un número');
  }
  if (typeof data.nombre !== 'string' || data.nombre.trim() === '') {
    errors.push('nombre debe ser un texto no vacío');
  }
  return errors;
}
