export function validateFavorito(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  return errors;
}
