export function validateCurso(data: any): string[] {
  const errors: string[] = [];
  if (data === null || typeof data !== 'object') return ['El dato debe ser un objeto'];
  if (typeof data.id !== 'number') errors.push('id debe ser un número');
  if (typeof data.publicadorId !== 'string') errors.push('publicadorId debe ser un UUID');
  if (typeof data.categoriaId !== 'number') errors.push('categoriaId debe ser un número');
  if (typeof data.titulo !== 'string' || data.titulo.trim() === '') errors.push('titulo debe ser un texto no vacío');
  if (typeof data.modalidadId !== 'number') errors.push('modalidadId debe ser un número');
  if (typeof data.nivelId !== 'number') errors.push('nivelId debe ser un número');
  if (typeof data.tipoCertificadoId !== 'number') errors.push('tipoCertificadoId debe ser un número');
  if (typeof data.precio !== 'number' || data.precio < 0) errors.push('precio debe ser un número no negativo');
  if (typeof data.esInterno !== 'boolean') errors.push('esInterno debe ser un booleano');
  if (typeof data.estaActivo !== 'boolean') errors.push('estaActivo debe ser un booleano');

  // COMENTARIO: Las fechas y el enlaceInscripcion dependen de reglas lógicas del negocio.
  // Es complejo verificar que las fechas no se traslapen solo con types rudimentarios.
  // Además, si esInterno es true, enlaceInscripcion DEBE ser nulo, de lo contrario no.
  if (data.esInterno && data.enlaceInscripcion !== null && data.enlaceInscripcion !== undefined) {
    errors.push('enlaceInscripcion debe ser nulo si el curso es interno');
  }
  if (!data.esInterno && (typeof data.enlaceInscripcion !== 'string' || data.enlaceInscripcion.trim() === '')) {
    errors.push('enlaceInscripcion es requerido para cursos externos');
  }

  return errors;
}
