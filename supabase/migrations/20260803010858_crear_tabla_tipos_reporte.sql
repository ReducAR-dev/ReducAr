    --Creamos tabla de tipos_reporte
CREATE TABLE tipos_reporte(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);

    --Activamos RLS 
    ALTER TABLE tipos_reporte ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer tipos_reporte"
    ON tipos_reporte
    FOR SELECT
    USING(true);