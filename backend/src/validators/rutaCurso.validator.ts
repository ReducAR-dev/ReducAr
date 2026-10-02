export function validateRutaCurso(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.rutaId !== 'number') errors.push('rutaId debe ser un número');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  if (typeof data.orden !== 'number' || data.orden < 0) errors.push('orden debe ser un número no negativo');
  return errors;
}
