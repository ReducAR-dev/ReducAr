export function validatePerfilVocacional(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.categoriaId !== 'number') errors.push('categoriaId debe ser un número');
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo es requerido');
  if (typeof data.descripcion !== 'string' || data.descripcion.trim() === '') errors.push('descripcion es requerida');
  if (typeof data.estaActivo !== 'boolean') errors.push('estaActivo debe ser booleano');
  return errors;
}
