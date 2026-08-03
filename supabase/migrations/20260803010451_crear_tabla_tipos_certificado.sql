    --Creamos tabla de tipos_certificado
CREATE TABLE tipos_certificado(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);

    --Activamos RLS 
    ALTER TABLE tipos_certificado ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer tipos_certificado"
    ON tipos_certificado
    FOR SELECT
    USING (true);