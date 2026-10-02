export function validateReporte(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.tipoReporteId !== 'number') errors.push('tipoReporteId debe ser un número');

  // COMENTARIO: entidadTipo está limitado por check a ('course', 'user', 'review', 'institution')
  const validEntidadTipos = ['course', 'user', 'review', 'institution'];
  if (!validEntidadTipos.includes(data.entidadTipo)) {
    errors.push(`entidadTipo debe ser uno de: ${validEntidadTipos.join(', ')}`);
  }

  if (typeof data.mensaje !== 'string' || data.mensaje.trim() === '') errors.push('mensaje es requerido');
  if (typeof data.estadoId !== 'number') errors.push('estadoId debe ser un número');
  return errors;
}
