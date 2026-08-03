    --Creamos tabla de estados_rutas_usuario
CREATE TABLE estados_ruta_usuario(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);

    --Activamos RLS 
    ALTER TABLE estados_ruta_usuario ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer estados_ruta_usuario"
    ON estados_ruta_usuario
    FOR SELECT
    USING(true);