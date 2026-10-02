export function validateRecursoModulo(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.moduloId !== 'number') errors.push('moduloId debe ser un número');
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo es requerido');

  // COMENTARIO: Los tipos de recurso están restringidos por un CHECK CONSTRAINT en la DB a ('pdf', 'link', 'video', 'text')
  const validTypes = ['pdf', 'link', 'video', 'text'];
  if (!validTypes.includes(data.tipo)) {
    errors.push(`tipo debe ser uno de: ${validTypes.join(', ')}`);
  }

  if (typeof data.url !== 'string' || data.url.trim() === '') errors.push('url es requerida');
  return errors;
}
