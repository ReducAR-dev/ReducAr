export function validateCategoria(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.nombre !== 'string' || data.nombre.trim() === '') errors.push('nombre debe ser texto no vacío');
  // descripcion es opcional
  if (data.descripcion !== null && data.descripcion !== undefined && typeof data.descripcion !== 'string') {
    errors.push('descripcion debe ser texto o nulo/indefinido');
  }
  // iconoUrl es opcional
  if (data.iconoUrl !== null && data.iconoUrl !== undefined && typeof data.iconoUrl !== 'string') {
    errors.push('iconoUrl debe ser texto o nulo/indefinido');
  }
  return errors;
}
