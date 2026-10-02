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

CREATE TABLE tipoCertificado (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE estadoCurso (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);

CREATE TABLE estadoRuta (
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

CREATE TABLE usuario (
  id uuid PRIMARY KEY,
  nombre varchar NOT NULL,
  apellido varchar,
  email varchar NOT NULL UNIQUE,
  fechaNacimiento date,
  fotoPerfil text,
  biografia text,
  ubicacion varchar,
  rolId integer NOT NULL,
  estaActivo boolean NOT NULL,
  fechaRegistro timestamp NOT NULL,
  fechaActualizacion timestamp NOT NULL,
  FOREIGN KEY (rolId) REFERENCES rol(id)
);

CREATE TABLE institucion (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL UNIQUE,
  nombre varchar NOT NULL UNIQUE,
  descripcion text,
  logoUrl text,
  sitioWeb text,
  emailContacto varchar,
  telefonoContacto varchar,
  ubicacion varchar,
  estaVerificada boolean NOT NULL,
  fechaCreacion timestamp NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id)
);

CREATE TABLE categoria (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE,
  descripcion text,
  iconoUrl text
);

CREATE TABLE curso (
  id integer PRIMARY KEY,
  publicadorId uuid NOT NULL,
  categoriaId integer NOT NULL,
  titulo varchar NOT NULL,
  descripcionCorta text,
  descripcionLarga text,
  modalidadId integer NOT NULL,
  nivelId integer NOT NULL,
  tipoCertificadoId integer NOT NULL,
  duracionDias integer,
  precio numeric NOT NULL,
  fechaInicio date,
  fechaTermino date,
  fechaMaxInscripcion date,
  fechaPublicacion timestamp NOT NULL,
  enlaceInscripcion text,
  esInterno boolean NOT NULL,
  cuposDisponibles integer,
  estaActivo boolean NOT NULL,
  FOREIGN KEY (publicadorId) REFERENCES usuario(id),
  FOREIGN KEY (categoriaId) REFERENCES categoria(id),
  FOREIGN KEY (modalidadId) REFERENCES modalidad(id),
  FOREIGN KEY (nivelId) REFERENCES nivel(id),
  FOREIGN KEY (tipoCertificadoId) REFERENCES tipoCertificado(id)
);

CREATE TABLE cursoImpartido (
  id integer PRIMARY KEY,
  cursoId integer NOT NULL UNIQUE,
  totalModulos integer NOT NULL,
  fechaCreacion timestamp NOT NULL,
  FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE TABLE moduloCurso (
  id integer PRIMARY KEY,
  cursoId integer NOT NULL,
  numeroModulo integer NOT NULL,
  titulo varchar NOT NULL,
  descripcion text,
  FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE UNIQUE INDEX uq_moduloCurso_orden ON moduloCurso (cursoId, numeroModulo);

CREATE TABLE recursoModulo (
  id integer PRIMARY KEY,
  moduloId integer NOT NULL,
  titulo varchar NOT NULL,
  tipo varchar NOT NULL,
  url text NOT NULL,
  orden integer,
  FOREIGN KEY (moduloId) REFERENCES moduloCurso(id)
);

CREATE TABLE cursoUsuario (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL,
  cursoId integer NOT NULL,
  estadoId integer NOT NULL,
  modulosCompletados integer NOT NULL,
  fechaAdquisicion timestamp NOT NULL,
  fechaFinalizacion timestamp,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (cursoId) REFERENCES curso(id),
  FOREIGN KEY (estadoId) REFERENCES estadoCurso(id)
);

CREATE UNIQUE INDEX uq_cursoUsuario ON cursoUsuario (usuarioId, cursoId);

CREATE TABLE rutaAprendizaje (
  id integer PRIMARY KEY,
  creadorId uuid,
  titulo varchar NOT NULL,
  descripcion text NOT NULL,
  imagenUrl text,
  nivelId integer NOT NULL,
  categoriaId integer,
  esPredeterminada boolean NOT NULL,
  estaActiva boolean NOT NULL,
  FOREIGN KEY (creadorId) REFERENCES usuario(id),
  FOREIGN KEY (nivelId) REFERENCES nivel(id),
  FOREIGN KEY (categoriaId) REFERENCES categoria(id)
);

CREATE TABLE rutaCurso (
  id integer PRIMARY KEY,
  rutaId integer NOT NULL,
  cursoId integer NOT NULL,
  orden integer NOT NULL,
  FOREIGN KEY (rutaId) REFERENCES rutaAprendizaje(id),
  FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE UNIQUE INDEX uq_rutaCurso ON rutaCurso (rutaId, cursoId);
CREATE UNIQUE INDEX uq_rutaCurso_orden ON rutaCurso (rutaId, orden);

CREATE TABLE rutaUsuario (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL,
  rutaId integer NOT NULL,
  estadoId integer NOT NULL,
  porcentajeCompletado integer NOT NULL,
  estaEnDashboard boolean NOT NULL,
  fechaInicio timestamp NOT NULL,
  fechaFinalizacion timestamp,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (rutaId) REFERENCES rutaAprendizaje(id),
  FOREIGN KEY (estadoId) REFERENCES estadoRuta(id)
);

CREATE UNIQUE INDEX uq_rutaUsuario ON rutaUsuario (usuarioId, rutaId);

CREATE TABLE favorito (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL,
  cursoId integer NOT NULL,
  fecha timestamp NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE UNIQUE INDEX uq_favorito ON favorito (usuarioId, cursoId);

CREATE TABLE valoracion (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL,
  cursoId integer NOT NULL,
  puntuacion integer NOT NULL,
  comentario text,
  estaActiva boolean NOT NULL,
  estaAprobada boolean NOT NULL,
  fechaAprobacion timestamp,
  ipAddress varchar,
  userAgent text,
  fecha timestamp NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE UNIQUE INDEX uq_valoracion ON valoracion (usuarioId, cursoId);

CREATE TABLE perfilVocacional (
  id integer PRIMARY KEY,
  categoriaId integer NOT NULL,
  titulo varchar NOT NULL,
  descripcion text NOT NULL,
  estaActivo boolean NOT NULL,
  FOREIGN KEY (categoriaId) REFERENCES categoria(id)
);

CREATE TABLE testUsuario (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL UNIQUE,
  perfilId integer NOT NULL,
  puntaje integer,
  fechaRealizacion timestamp NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (perfilId) REFERENCES perfilVocacional(id)
);

CREATE TABLE reporte (
  id integer PRIMARY KEY,
  usuarioId uuid NOT NULL,
  tipoReporteId integer NOT NULL,
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  mensaje text NOT NULL,
  estadoId integer NOT NULL,
  respuestaAdmin text,
  fechaCreacion timestamp NOT NULL,
  fechaResolucion timestamp,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (tipoReporteId) REFERENCES tipoReporte(id),
  FOREIGN KEY (estadoId) REFERENCES estadoReporte(id)
);

CREATE TABLE promocion (
  id integer PRIMARY KEY,
  cursoId integer NOT NULL,
  creadorId uuid NOT NULL,
  titulo varchar NOT NULL,
  descuentoPorcentaje integer NOT NULL,
  motivo varchar,
  etiquetaUrl text,
  fechaInicio date NOT NULL,
  fechaFinalizacion date NOT NULL,
  orden integer,
  esForzada boolean NOT NULL,
  montoSubsidiado numeric,
  estaActiva boolean NOT NULL,
  FOREIGN KEY (cursoId) REFERENCES curso(id),
  FOREIGN KEY (creadorId) REFERENCES usuario(id)
);

CREATE TABLE auditoria (
  id integer PRIMARY KEY,
  usuarioId uuid,
  tipoAccionId integer NOT NULL,
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  valoresAnteriores text,
  valoresNuevos text,
  ipAddress varchar,
  userAgent text,
  requestId varchar,
  exito boolean NOT NULL,
  fecha timestamp NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES usuario(id),
  FOREIGN KEY (tipoAccionId) REFERENCES tipoAccion(id)
);

CREATE INDEX idx_auditoria_entidad ON auditoria (entidadTipo, entidadId);
CREATE INDEX idx_auditoria_usuario_fecha ON auditoria (usuarioId, fecha);
CREATE INDEX idx_auditoria_request ON auditoria (requestId);