export function validatePromocion(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  if (typeof data.creadorId !== 'string') errors.push('creadorId debe ser un UUID');
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo es requerido');

  // COMENTARIO: descuentoPorcentaje debe estar entre 1 y 100 por CHECK constraint
  if (typeof data.descuentoPorcentaje !== 'number' || data.descuentoPorcentaje < 1 || data.descuentoPorcentaje > 100) {
    errors.push('descuentoPorcentaje debe estar entre 1 y 100');
  }

  if (typeof data.esForzada !== 'boolean') errors.push('esForzada debe ser booleano');
  if (typeof data.estaActiva !== 'boolean') errors.push('estaActiva debe ser booleano');
  return errors;
}
