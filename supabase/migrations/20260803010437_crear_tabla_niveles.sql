    --Creamos tabla de niveles
CREATE TABLE niveles(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);    
    --Activamos RLS 
    ALTER TABLE niveles ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer niveles"
    ON niveles
    FOR SELECT
    USING (true);