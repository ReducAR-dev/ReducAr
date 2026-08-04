    --Creamos tabla de Cursos
CREATE TABLE cursos (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo varchar(100) NOT NULL,
    descripcion_corta text,
    descripcion_larga text,
    fecha_inicio date,
    fecha_termino date,
    fecha_max_inscripcion date,
    fecha_publicacion timestamp DEFAULT CURRENT_TIMESTAMP,
    enlace_inscripcion text NOT NULL,
    cupos_disponibles integer,
    esta_activo boolean DEFAULT true
);

    --Activamos RLS 
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
CREATE POLICY "Todos pueden ver cursos"
ON cursos
FOR SELECT
USING (true);