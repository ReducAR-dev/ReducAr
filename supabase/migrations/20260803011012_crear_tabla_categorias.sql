    --Creamos tabla de categorias
CREATE TABLE categorias(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE,
    descripcion text,
    icono_url text
);

    -- Activar RLS
    ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

    -- Permitir que todos los usuarios autenticados puedan consultar
    CREATE POLICY "Todos pueden leer categorias"
    ON categorias
    FOR SELECT
    USING (true);