export function validateCursoImpartido(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  if (typeof data.totalModulos !== 'number' || data.totalModulos < 0) {
    errors.push('totalModulos debe ser un número entero no negativo');
  }
  return errors;
}
