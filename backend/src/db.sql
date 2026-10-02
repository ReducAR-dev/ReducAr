-- =============================================
-- 1. TABLAS AUXILIARES ESTÁTICAS
-- =============================================

CREATE TABLE public.rol (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.rol.nombre IS 'admin, user, both, institution';

CREATE TABLE public.modalidad (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.modalidad.nombre IS 'inPerson, hybrid, remote, async';

CREATE TABLE public.nivel (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.nivel.nombre IS 'easy, medium, hard';

CREATE TABLE public.tipoCertificado (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.tipoCertificado.nombre IS 'course, training, postSecondary, universityLevel, language';

CREATE TABLE public.estadoCurso (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.estadoCurso.nombre IS 'purchased, inProgress, complete, abandoned';

CREATE TABLE public.estadoRuta (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.estadoRuta.nombre IS 'notStarted, started, finished, cancelled';

CREATE TABLE public.tipoReporte (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.tipoReporte.nombre IS 'technical, courseRelated, suggestion, bug';

CREATE TABLE public.estadoReporte (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.estadoReporte.nombre IS 'pending, inReview, resolved, ignored';

CREATE TABLE public.tipoAccion (
  id integer PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE
);
COMMENT ON COLUMN public.tipoAccion.nombre IS 'created, updated, deleted, approved, rejected';

-- =============================================
-- 2. CUENTAS
-- =============================================

CREATE TABLE public.usuario (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre varchar NOT NULL,
  apellido varchar,
  email varchar NOT NULL UNIQUE,
  fechaNacimiento date,
  fotoPerfil text,
  biografia text,
  ubicacion varchar,
  rolId integer NOT NULL DEFAULT 2 REFERENCES public.rol(id),
  estaActivo boolean NOT NULL DEFAULT true,
  fechaRegistro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fechaActualizacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.institucion (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL UNIQUE REFERENCES public.usuario(id) ON DELETE CASCADE,
  nombre varchar NOT NULL UNIQUE,
  descripcion text,
  logoUrl text,
  sitioWeb text,
  emailContacto varchar,
  telefonoContacto varchar,
  ubicacion varchar,
  estaVerificada boolean NOT NULL DEFAULT false,
  fechaCreacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. CURSOS
-- =============================================

CREATE TABLE public.categoria (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre varchar NOT NULL UNIQUE,
  descripcion text,
  iconoUrl text
);

CREATE TABLE public.curso (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  publicadorId uuid NOT NULL REFERENCES public.usuario(id),
  categoriaId integer NOT NULL REFERENCES public.categoria(id),
  titulo varchar NOT NULL,
  descripcionCorta text,
  descripcionLarga text,
  modalidadId integer NOT NULL REFERENCES public.modalidad(id),
  nivelId integer NOT NULL REFERENCES public.nivel(id),
  tipoCertificadoId integer NOT NULL REFERENCES public.tipoCertificado(id),
  duracionDias integer,
  precio numeric NOT NULL DEFAULT 0,
  fechaInicio date,
  fechaTermino date,
  fechaMaxInscripcion date,
  fechaPublicacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  enlaceInscripcion text,
  esInterno boolean NOT NULL DEFAULT false,
  cuposDisponibles integer,
  estaActivo boolean NOT NULL DEFAULT true,
  CONSTRAINT chk_curso_precio_no_negativo CHECK (precio >= 0),
  CONSTRAINT chk_curso_interno_enlace CHECK (
    (esInterno = true AND enlaceInscripcion IS NULL)
    OR (esInterno = false AND enlaceInscripcion IS NOT NULL)
  )
);

CREATE TABLE public.cursoImpartido (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cursoId integer NOT NULL UNIQUE REFERENCES public.curso(id) ON DELETE CASCADE,
  totalModulos integer NOT NULL DEFAULT 0,
  fechaCreacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.moduloCurso (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  numeroModulo integer NOT NULL,
  titulo varchar NOT NULL,
  descripcion text,
  CONSTRAINT uq_modulo_curso_orden UNIQUE (cursoId, numeroModulo)
);

CREATE TABLE public.recursoModulo (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  moduloId integer NOT NULL REFERENCES public.moduloCurso(id) ON DELETE CASCADE,
  titulo varchar NOT NULL,
  tipo varchar NOT NULL,
  url text NOT NULL,
  orden integer,
  CONSTRAINT chk_recurso_tipo CHECK (tipo IN ('pdf', 'link', 'video', 'text'))
);

CREATE TABLE public.cursoUsuario (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL REFERENCES public.usuario(id) ON DELETE CASCADE,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  estadoId integer NOT NULL REFERENCES public.estadoCurso(id),
  modulosCompletados integer NOT NULL DEFAULT 0,
  fechaAdquisicion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fechaFinalizacion timestamp,
  CONSTRAINT uq_curso_usuario UNIQUE (usuarioId, cursoId)
);

-- =============================================
-- 4. RUTAS DE APRENDIZAJE
-- =============================================

CREATE TABLE public.rutaAprendizaje (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  creadorId uuid REFERENCES public.usuario(id) ON DELETE CASCADE,
  titulo varchar NOT NULL,
  descripcion text NOT NULL,
  imagenUrl text,
  nivelId integer NOT NULL REFERENCES public.nivel(id),
  categoriaId integer REFERENCES public.categoria(id),
  esPredeterminada boolean NOT NULL DEFAULT false,
  estaActiva boolean NOT NULL DEFAULT true
);

CREATE TABLE public.rutaCurso (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rutaId integer NOT NULL REFERENCES public.rutaAprendizaje(id) ON DELETE CASCADE,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  orden integer NOT NULL,
  CONSTRAINT uq_ruta_curso UNIQUE (rutaId, cursoId),
  CONSTRAINT uq_ruta_orden UNIQUE (rutaId, orden)
);

CREATE TABLE public.rutaUsuario (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL REFERENCES public.usuario(id) ON DELETE CASCADE,
  rutaId integer NOT NULL REFERENCES public.rutaAprendizaje(id) ON DELETE CASCADE,
  estadoId integer NOT NULL REFERENCES public.estadoRuta(id),
  porcentajeCompletado integer NOT NULL DEFAULT 0,
  estaEnDashboard boolean NOT NULL DEFAULT false,
  fechaInicio timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fechaFinalizacion timestamp,
  CONSTRAINT uq_ruta_usuario UNIQUE (usuarioId, rutaId)
);

-- =============================================
-- 5. INTERACCIONES DEL USUARIO
-- =============================================

CREATE TABLE public.favorito (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL REFERENCES public.usuario(id) ON DELETE CASCADE,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_favorito UNIQUE (usuarioId, cursoId)
);

CREATE TABLE public.valoracion (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL REFERENCES public.usuario(id) ON DELETE CASCADE,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  puntuacion integer NOT NULL,
  comentario text,
  estaActiva boolean NOT NULL DEFAULT true,
  estaAprobada boolean NOT NULL DEFAULT false,
  fechaAprobacion timestamp,
  ipAddress varchar,
  userAgent text,
  fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_valoracion UNIQUE (usuarioId, cursoId),
  CONSTRAINT chk_valoracion_puntuacion CHECK (puntuacion BETWEEN 1 AND 5)
);

-- =============================================
-- 6. TEST VOCACIONAL
-- =============================================

CREATE TABLE public.perfilVocacional (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  categoriaId integer NOT NULL REFERENCES public.categoria(id),
  titulo varchar NOT NULL,
  descripcion text NOT NULL,
  estaActivo boolean NOT NULL DEFAULT true
);

CREATE TABLE public.testUsuario (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL UNIQUE REFERENCES public.usuario(id) ON DELETE CASCADE,
  perfilId integer NOT NULL REFERENCES public.perfilVocacional(id),
  puntaje integer,
  fechaRealizacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 7. REPORTES
-- =============================================

CREATE TABLE public.reporte (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid NOT NULL REFERENCES public.usuario(id) ON DELETE CASCADE,
  tipoReporteId integer NOT NULL REFERENCES public.tipoReporte(id),
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  mensaje text NOT NULL,
  estadoId integer NOT NULL DEFAULT 1 REFERENCES public.estadoReporte(id),
  respuestaAdmin text,
  fechaCreacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fechaResolucion timestamp,
  CONSTRAINT chk_reporte_entidad_tipo CHECK (
    entidadTipo IN ('course', 'user', 'review', 'institution')
  )
);

-- =============================================
-- 8. PROMOCIONES
-- =============================================

CREATE TABLE public.promocion (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cursoId integer NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  creadorId uuid NOT NULL REFERENCES public.usuario(id),
  titulo varchar NOT NULL,
  descuentoPorcentaje integer NOT NULL,
  motivo varchar,
  etiquetaUrl text,
  fechaInicio date NOT NULL,
  fechaFinalizacion date NOT NULL,
  orden integer,
  esForzada boolean NOT NULL DEFAULT false,
  montoSubsidiado numeric,
  estaActiva boolean NOT NULL DEFAULT true,
  CONSTRAINT chk_promocion_descuento CHECK (descuentoPorcentaje BETWEEN 1 AND 100),
  CONSTRAINT chk_promocion_fechas CHECK (fechaFinalizacion >= fechaInicio),
  CONSTRAINT chk_promocion_subsidio CHECK (
    (esForzada = false AND montoSubsidiado IS NULL)
    OR (esForzada = true AND montoSubsidiado IS NOT NULL)
  )
);

-- =============================================
-- 9. AUDITORÍA
-- =============================================

CREATE TABLE public.auditoria (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuarioId uuid REFERENCES public.usuario(id) ON DELETE SET NULL,
  tipoAccionId integer NOT NULL REFERENCES public.tipoAccion(id),
  entidadTipo varchar NOT NULL,
  entidadId varchar,
  valoresAnteriores text,
  valoresNuevos text,
  ipAddress varchar,
  userAgent text,
  requestId varchar,
  exito boolean NOT NULL DEFAULT true,
  fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_auditoria_entidad_tipo CHECK (
    entidadTipo IN ('course', 'user', 'review', 'report', 'promotion', 'institution')
  )
);

CREATE INDEX idx_auditoria_entidad ON public.auditoria (entidadTipo, entidadId);
CREATE INDEX idx_auditoria_usuario_fecha ON public.auditoria (usuarioId, fecha);
CREATE INDEX idx_auditoria_request ON public.auditoria (requestId);