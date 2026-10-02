export function validateTestUsuario(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.perfilId !== 'number') errors.push('perfilId debe ser un número');
  if (data.puntaje !== null && data.puntaje !== undefined && typeof data.puntaje !== 'number') {
    errors.push('puntaje debe ser un número o nulo');
  }
  return errors;
}
