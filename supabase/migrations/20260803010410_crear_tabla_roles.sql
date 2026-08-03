    --Creamos tabla de usuarios
CREATE TABLE roles(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
    --Activamos RLS 
    ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer roles"
    ON roles
    FOR SELECT
    USING (true);