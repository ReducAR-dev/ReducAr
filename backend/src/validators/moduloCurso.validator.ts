export function validateModuloCurso(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  if (typeof data.numeroModulo !== 'number' || data.numeroModulo <= 0) {
    errors.push('numeroModulo debe ser un entero positivo');
  }
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo es requerido');
  return errors;
}
