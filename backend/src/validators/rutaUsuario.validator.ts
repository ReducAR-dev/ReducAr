export function validateRutaUsuario(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.rutaId !== 'number') errors.push('rutaId debe ser un número');
  if (typeof data.estadoId !== 'number') errors.push('estadoId debe ser un número');
  if (typeof data.porcentajeCompletado !== 'number' || data.porcentajeCompletado < 0 || data.porcentajeCompletado > 100) {
    errors.push('porcentajeCompletado debe ser un número entre 0 y 100');
  }
  if (typeof data.estaEnDashboard !== 'boolean') errors.push('estaEnDashboard debe ser un booleano');
  return errors;
}
