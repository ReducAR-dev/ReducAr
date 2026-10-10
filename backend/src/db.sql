-- ============ TABLAS AUXILIARES ============

CREATE TABLE rol (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE modalidad (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE nivel (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE tipo_certificado (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE tipoReporte (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE estadoReporte (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE tipoAccion (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

-- ============ FIN TABLAS AUXILIARES ============

CREATE TABLE usuario (
  id uuid PRIMARY KEY,
  nombre varchar NOT NULL,
  apellido varchar,
  email varchar UNIQUE NOT NULL,
  fecha_nacimiento date,
  fotoPerfil text,
  biografia text,
  ubicacion varchar,
  user_preferencia varchar,
  rolId integer REFERENCES rol(id),
  esta_activo boolean,
  fecha_registro timestamp,
  fecha_actualizacion timestamp
);

CREATE TABLE categoria (
  id integer PRIMARY KEY,
  nombre varchar UNIQUE NOT NULL,
  descripcion text,
  iconoUrl text
);

CREATE TABLE curso (
  id integer PRIMARY KEY,
  nombre_propietario varchar,
  categoriaId integer REFERENCES categoria(id),
  titulo varchar NOT NULL,
  descripcionCorta text,
  descripcionLarga text,
  modalidadId integer REFERENCES modalidad(id),
  nivelId integer REFERENCES nivel(id),
  tipoCertificadoId integer REFERENCES tipo_certificado(id),
  duracionDias integer,
  precio numeric,
  fechaInicio date,
  fechaTermino date,
  fechaMaxInscripcion date,
  fechaPubliacion timestamp,
  enlaceInscricpcion text,
  cuposDisponibles integer,
  estaActivo boolean
);

CREATE TABLE cursoUsuario (
  id integer PRIMARY KEY,
  usuarioId uuid REFERENCES usuario(id),
  cursoId integer REFERENCES curso(id),
  estado_curso varchar,
  modulosCompletados integer,
  fechaAdquisicion timestamp,
  fechaFinalizacion timestamp
);

CREATE TABLE favorito (
  id integer PRIMARY KEY,
  usuarioId uuid REFERENCES usuario(id),
  cursoId integer REFERENCES curso(id),
  fecha timestamp
);

CREATE TABLE valoracion (
  id integer PRIMARY KEY,
  usuarioId uuid REFERENCES usuario(id),
  cursoId integer REFERENCES curso(id),
  puntuacion integer NOT NULL,
  comentario text,
  estaActiva boolean,
  estaAprobada boolean,
  fechaAprobacion timestamp,
  ipAddress varchar,
  userAgent text,
  fecha timestamp
);

CREATE TABLE reporte (
  id integer PRIMARY KEY,
  usuarioId uuid REFERENCES usuario(id),
  tipoReporteId integer REFERENCES tipoReporte(id),
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  mensaje text NOT NULL,
  estadoId integer REFERENCES estadoReporte(id),
  respuestaAdmin text,
  fechaCreacion timestamp,
  fechaResolucion timestamp
);

CREATE TABLE promocion (
  id integer PRIMARY KEY,
  cursoId integer REFERENCES curso(id),
  titulo varchar NOT NULL,
  descuentoPorcentaje integer NOT NULL,
  motivo varchar,
  etiquetaUrl text,
  fechaInicio date NOT NULL,
  fechaFinalizacion date NOT NULL,
  orden integer,
  estaActiva boolean
);

CREATE TABLE auditoria (
  id integer PRIMARY KEY,
  usuarioId integer,
  tipoAccionId integer REFERENCES tipoAccion(id),
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  valoresAnteriores text,
  valoresNuevos text,
  ipAddress varchar,
  userAgent text,
  requestId varchar,
  exito boolean,
  fecha timestamp
);