export function validateAuditoria(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (data.usuarioId !== null && data.usuarioId !== undefined && typeof data.usuarioId !== 'string') {
    errors.push('usuarioId debe ser un UUID o nulo');
  }
  if (typeof data.tipoAccionId !== 'number') errors.push('tipoAccionId debe ser un número');

  // COMENTARIO: entidadTipo en auditoría está limitado a ('course', 'user', 'review', 'report', 'promotion', 'institution')
  const validTipos = ['course', 'user', 'review', 'report', 'promotion', 'institution'];
  if (!validTipos.includes(data.entidadTipo)) {
    errors.push(`entidadTipo debe ser uno de: ${validTipos.join(', ')}`);
  }

  if (typeof data.exito !== 'boolean') errors.push('exito debe ser booleano');
  return errors;
}
