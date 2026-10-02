export interface CursoResumen {
  id: number;
  titulo: string;
  institucion: string; 
  categoria: string; 
  descripcionCorta: string; 
  modalidad: string; 
  precio: number;
}

export interface CursoDetalle { 
  id: number; 
  institucion: string; 
  categoria: string; 
  titulo: string; 
  descripcionLarga: string; 
  modalidad: string; 
  nivel: string; 
  tipoCertificado: string; 
  duracionDias: number;
  precio: number;
  fechaInicio: string; 
  fechaTermino: string; 
  fechaMaxInscripcion: string; 
  enlaceInscripcion: string;
  cuposDisponibles: number;
}