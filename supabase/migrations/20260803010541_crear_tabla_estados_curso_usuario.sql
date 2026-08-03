    --Creamos tabla de estados_curso_usuario
CREATE TABLE estados_curso_usuario(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
    --Activamos RLS 
    ALTER TABLE estados_curso_usuario ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer estados_curso_usuario"
    ON estados_curso_usuario
    FOR SELECT
    USING(true);