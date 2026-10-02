import { UUID, Timestamp, DateString } from './common.types';

export interface usuario {
  id: UUID;
  nombre: string;
  apellido: string | null;
  email: string;
  fechaNacimiento: DateString | null;
  fotoPerfil: string | null;
  biografia: string | null;
  ubicacion: string | null;
  rolId: number;
  estaActivo: boolean;
  fechaRegistro: Timestamp;
  fechaActualizacion: Timestamp;
}
