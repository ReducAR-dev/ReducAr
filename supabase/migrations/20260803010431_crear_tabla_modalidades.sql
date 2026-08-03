    --Creamos tabla de modalidades
CREATE TABLE modalidades(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
    --Activamos RLS 
    ALTER TABLE modalidades ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer modalidades"
    ON modalidades
    FOR SELECT
    USING (true);