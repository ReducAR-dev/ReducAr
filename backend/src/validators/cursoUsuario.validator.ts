export function validateCursoUsuario(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.usuarioId !== 'string') errors.push('usuarioId debe ser un UUID');
  if (typeof data.cursoId !== 'number') errors.push('cursoId debe ser un número');
  if (typeof data.estadoId !== 'number') errors.push('estadoId debe ser un número');
  if (typeof data.modulosCompletados !== 'number' || data.modulosCompletados < 0) {
    errors.push('modulosCompletados debe ser un número no negativo');
  }
  return errors;
}
