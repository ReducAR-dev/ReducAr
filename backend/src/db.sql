-- =============================================================
-- ReducAR — Esquema de base de datos
-- =============================================================
-- Generado a partir del estado real de la BD (2026-10-15).
-- Motor: PostgreSQL 15+ (Supabase)
-- Esquema: public
--
-- ⚠️ CAMBIOS PENDIENTES AL APLICAR ESTE SCRIPT EN UNA BD EXISTENTE:
--   1. auditoria.tipo_accionid  → tipo_accion_id
--   2. reporte.tipo_reporteid   → tipo_reporte_id
--
-- El resto del esquema refleja la BD actual sin cambios.
-- Las reglas de auditoría (RLS, políticas, trigger) se agregan al final.
-- =============================================================

-- =============================================================
-- 1. TABLAS AUXILIARES ESTÁTICAS
-- =============================================================

CREATE TABLE rol (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE modalidad (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE nivel (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE tipo_certificado (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE tipo_reporte (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE estado_reporte (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

CREATE TABLE tipo_accion (
    id      integer     PRIMARY KEY,
    nombre  varchar     NOT NULL UNIQUE
);

-- =============================================================
-- 2. USUARIOS
-- =============================================================
-- id está vinculado 1 a 1 con auth.users.id de Supabase.
-- La fila se crea automáticamente por el trigger handle_new_user.

CREATE TABLE usuario (
    id                  uuid        PRIMARY KEY,
    nombre              varchar     NOT NULL,
    apellido            varchar,
    email               varchar     NOT NULL UNIQUE,
    fecha_nacimiento    date,
    foto_perfil         text,
    biografia           text,
    ubicacion           varchar,
    user_preferencia    varchar,
    rol_id              integer     REFERENCES rol(id) DEFAULT 2,
    esta_activo         boolean     DEFAULT true,
    fecha_registro      timestamp   DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp   DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- 3. CATEGORÍAS Y CURSOS
-- =============================================================

CREATE TABLE categoria (
    id          integer     PRIMARY KEY,
    nombre      varchar     NOT NULL UNIQUE,
    descripcion text,
    icono_url   text
);

CREATE TABLE curso (
    id                      integer     PRIMARY KEY,
    nombre_propietario      varchar,
    categoria_id            integer     REFERENCES categoria(id),
    titulo                  varchar     NOT NULL,
    descripcion_corta       text,
    descripcion_larga       text,
    modalidad_id            integer     REFERENCES modalidad(id),
    nivel_id                integer     REFERENCES nivel(id),
    tipo_certificado_id     integer     REFERENCES tipo_certificado(id),
    duracion_dias           integer,
    precio                  numeric     DEFAULT 0,
    fecha_inicio            date,
    fecha_termino           date,
    fecha_max_inscripcion   date,
    fecha_publicacion       timestamp   DEFAULT CURRENT_TIMESTAMP,
    enlace_inscripcion      text,
    cupos_disponibles       integer,
    esta_activo             boolean     DEFAULT true,
    imagen_url              text
);

-- =============================================================
-- 4. PROGRESO DEL USUARIO
-- =============================================================
-- UNIQUE compuesto evita que un usuario tenga el mismo curso 2 veces.

CREATE TABLE curso_usuario (
    id                  integer     PRIMARY KEY,
    usuario_id          uuid        REFERENCES usuario(id),
    curso_id            integer     REFERENCES curso(id),
    fecha_adquisicion   timestamp   DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion  timestamp,
    UNIQUE (usuario_id, curso_id)
);

-- =============================================================
-- 5. INTERACCIONES DEL USUARIO
-- =============================================================

CREATE TABLE favorito (
    id          integer     PRIMARY KEY,
    usuario_id  uuid        REFERENCES usuario(id),
    curso_id    integer     REFERENCES curso(id),
    fecha       timestamp   DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, curso_id)
);

CREATE TABLE valoracion (
    id                  integer     PRIMARY KEY,
    usuario_id          uuid        NOT NULL REFERENCES usuario(id),
    curso_id            integer     NOT NULL REFERENCES curso(id),
    puntuacion          integer     NOT NULL,
    comentario          text,
    esta_activa         boolean     DEFAULT true,
    esta_aprobada       boolean     DEFAULT false,
    fecha_aprobacion    timestamp,
    ip_address          varchar,
    user_agent          text,
    fecha               timestamp   DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, curso_id)
);

-- =============================================================
-- 6. REPORTES
-- =============================================================

CREATE TABLE reporte (
    id                  integer     PRIMARY KEY,
    usuario_id          uuid        REFERENCES usuario(id),
    tipo_reporte_id     integer     REFERENCES tipo_reporte(id),
    entidad_tipo        varchar     NOT NULL,
    entidad_id          varchar,
    mensaje             text        NOT NULL,
    estado_id           integer     REFERENCES estado_reporte(id) DEFAULT 1,
    respuesta_admin     text,
    fecha_creacion      timestamp   DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion    timestamp
);

-- =============================================================
-- 7. PROMOCIONES
-- =============================================================

CREATE TABLE promocion (
    id                      integer     PRIMARY KEY,
    curso_id                integer     REFERENCES curso(id),
    titulo                  varchar     NOT NULL,
    descuento_porcentaje    integer     NOT NULL,
    motivo                  varchar,
    etiqueta_url            text,
    fecha_inicio            date        NOT NULL,
    fecha_finalizacion      date        NOT NULL,
    orden                   integer,
    esta_activa             boolean     DEFAULT true
);

-- =============================================================
-- 8. AUDITORÍA
-- =============================================================
-- Tabla append-only. No se modifica ni se elimina nunca.
-- Se llena automáticamente desde el backend con service_role.
-- RLS activo, sin políticas para usuarios normales (ver al final).

CREATE TABLE auditoria (
    id                  integer     PRIMARY KEY,
    usuario_id          uuid        REFERENCES usuario(id) ON DELETE SET NULL,
    tipo_accion_id      integer     REFERENCES tipo_accion(id),
    entidad_tipo        varchar     NOT NULL,
    entidad_id          varchar,
    valores_anteriores  text,
    valores_nuevos      text,
    ip_address          varchar,
    user_agent          text,
    request_id          varchar,
    exito               boolean     DEFAULT true,
    fecha               timestamp   DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================
-- 9. Novedades
-- =============================================================
-- Tabla Creada
-- Se llena automáticamente el ID
-- RLS activo
CREATE TABLE novedad (
    id                      integer     PRIMARY KEY,
    titulo                  varchar     NOT NULL,
    descripcion_corta       text,
    descripcion_larga       text,
    fecha_evento            date        NOT NULL,
    modalidad_id            integer     REFERENCES modalidad(id),
    ubicacion               varchar,
    imagen_url              text,
    enlace                  text,
    esta_activa             boolean     DEFAULT true,
    fecha_creacion          timestamp   DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion     timestamp   DEFAULT CURRENT_TIMESTAMP
);


/* =============================================
// 9. REGLAS DE NEGOCIO POR SECCIÓN
// =============================================
//     actualizar datos deben poder repetirse sin duplicar información.
*
// -------------------------------------------------
// SECCIÓN 1: TABLAS AUXILIARES ESTÁTICAS
// -------------------------------------------------
//
//   - Los valores de estas tablas son fijos. No se modifican ni se eliminan
//     salvo por decisión explícita del admin.
//   - Se pueden AÑADIR valores nuevos (por ejemplo, un nuevo tipo de reporte),
//     pero no se modifican los existentes.
//   - Cada tabla tiene un rango de valores esperado, documentado en los
//     comentarios de la sección.
//   - Los IDs 1, 2 y 3 de la tabla `rol` están reservados:
//       1 = admin, 2 = user, 3 = institution.
//     El rol `both` (4) es el único que se puede asignar a usuarios que
//     imparten y cursan.
//
// -------------------------------------------------
// SECCIÓN 2: CUENTAS (usuario, institucion)
// -------------------------------------------------
//
//   - Todo usuario registrado tiene una fila en `usuario` vinculada a
//     `auth.users` de Supabase. El id es un UUID.
//   - Un usuario solo puede tener un rol a la vez.
//   - El rol por defecto es 2 (user).
//   - Nadie puede auto-asignarse el rol admin (1). Solo un admin puede
//     crear otro admin.
//   - La tabla `institucion` es una extensión 1 a 1 de `usuario`.
//     Solo los usuarios con rol `institution` tienen fila en `institucion`.
//   - Un usuario con rol `both` puede publicar cursos como persona física,
//     sin necesidad de fila en `institucion`.
//   - La verificación de instituciones (`estaVerificada`) es manual,
//     hecha por un admin.
//
// -------------------------------------------------
// SECCIÓN 3: CURSOS
// -------------------------------------------------
//
//   - Solo usuarios con rol `both` o `institution` pueden publicar cursos.
//   - Todo curso debe tener categoría, modalidad, nivel y tipo de certificado.
//   - Si `precio > 0` → el curso es de pago.
//     Si `precio = 0` → el curso es gratuito (no puede tener precio mayor a 0).
//   - Si `esInterno = true` → el curso se imparte dentro de ReducAR
//     y debe tener una fila en `cursoImpartido` con al menos un módulo.
//   - Si `esInterno = false` → el curso es externo, `enlaceInscripcion` es
//     obligatorio y no debe tener fila en `cursoImpartido`.
//   - Los cursos asincrónicos pueden no tener `fechaInicio` ni `fechaTermino`.
//   - Los cursos sincrónicos deben tener `fechaInicio` y `fechaTermino`.
//   - `cuposDisponibles = null` significa cupos ilimitados.
//   - `estaActivo = false` oculta el curso del listado público, pero no lo elimina.
//   - Un curso con `cursoUsuario` asociados no puede eliminarse sin revisión
//     de auditoría.
//
// -------------------------------------------------
// SECCIÓN 4: RUTAS DE APRENDIZAJE
// -------------------------------------------------
//
//   - Las rutas predeterminadas (`esPredeterminada = true`) tienen
//     `creadorId = null`. Solo los admins las crean y modifican.
//   - Las rutas personales tienen `creadorId = <uuid>` y son privadas.
//     Ningún usuario puede ver las rutas personales de otro.
//   - Un usuario puede tener máximo 3 rutas personales a la vez.
//   - Un usuario puede tener máximo 3 rutas en su dashboard
//     (`estaEnDashboard = true`).
//   - Las rutas personales pueden tener hasta 4 cursos.
//     Las rutas predeterminadas pueden tener hasta 8 cursos.
//   - Cuando un usuario guarda una ruta predeterminada, se crea una fila
//     en `rutaUsuario` que la referencia. NO se duplica la ruta.
//   - El orden de los cursos en una ruta es único por ruta.
//
// -------------------------------------------------
// SECCIÓN 5: INTERACCIONES DEL USUARIO
// -------------------------------------------------
//
//   - Un usuario no puede guardar el mismo curso como favorito dos veces.
//   - Un usuario no puede valorar el mismo curso dos veces.
//   - Las valoraciones son públicas solo si `estaAprobada = true` y
//     `estaActiva = true`.
//   - Cuando un usuario "elimina" su valoración, se hace un UPDATE
//     a `estaActiva = false`, no un DELETE.
//   - La IP y el user-agent de las valoraciones solo los ven los admins.
//
// -------------------------------------------------
// SECCIÓN 6: TEST VOCACIONAL
// -------------------------------------------------
//
//   - Las preguntas y opciones viven en el frontend, no en la BD.
//   - La BD solo guarda los perfiles posibles (`perfilVocacional`)
//     y el resultado del usuario (`testUsuario`).
//   - Un usuario solo tiene un resultado de test activo. Si lo vuelve
//     a hacer, se hace UPDATE, no INSERT.
//   - El test de usuarios anónimos (5 preguntas) no se persiste.
//   - El test de usuarios logueados (15 preguntas) sí se persiste.
//   - Los perfiles inactivos no se asignan a nuevos usuarios, pero los
//     antiguos conservan su referencia.
//
// -------------------------------------------------
// SECCIÓN 7: REPORTES Y AUDITORÍA
// -------------------------------------------------
//
//   - Cualquier usuario logueado puede crear un reporte.
//   - Un reporte puede apuntar a un curso, usuario, valoración o institución.
//   - El campo `entidadTipo` indica a qué tabla apunta `entidadId`.
//   - Solo los admins pueden leer, actualizar o resolver reportes.
//   - Al resolver un reporte, se rellena `respuestaAdmin` y `fechaResolucion`.
//   - La auditoría es append-only: no se modifica ni se elimina.
//   - Las reglas de RLS de auditoría son obligatorias (ver sección 9).
//
// -------------------------------------------------
// SECCIÓN 8: PROMOCIONES
// -------------------------------------------------
//
//   - Solo una promoción activa por curso a la vez. Al activar una nueva,
//     las anteriores se desactivan automáticamente.
//   - El `creadorId` puede ser el dueño del curso o un admin.
//   - Si `esForzada = true`, ReducAR absorbe el descuento. El dueño recibe
//     el precio completo y `montoSubsidiado` registra cuánto puso ReducAR.
//   - Si `esForzada = false`, el dueño absorbe el descuento.
//   - Una promoción solo es válida si `estaActiva = true` Y la fecha actual
//     está entre `fechaInicio` y `fechaFinalizacion`.
//   - El orden del carrusel: primero las promos con `orden` definido
//     (ascendente), luego las que tienen `orden = null` ordenadas por
//     `fechaFinalizacion` ascendente.
//   - Las promociones forzadas se auditan obligatoriamente.
//
// -------------------------------------------------
// REGLAS TRANSVERSALES
// -------------------------------------------------
//
//   - Confianza cero: frontend, backend y BD nunca asumen que el otro
//     validó correctamente. Cada capa valida por su cuenta.
//   - Denegar por defecto, permitir explícitamente: toda tabla tiene RLS
//     activo, y ninguna operación es pública sin política explícita.
//   - Soft delete: los datos sensibles no se eliminan, se desactivan.
//   - Auditoría inmutable: las acciones críticas se registran y no se
//     pueden modificar ni borrar.
//   - Idempotencia en operaciones sensibles: los endpoints que crean o
//     actualizan datos deben poder repetirse sin duplicar información.
*/