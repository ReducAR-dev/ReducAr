    --Creamos tabla de instituciones
CREATE TABLE instituciones(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE,
    descripcion text,
    logo_url text,
    sitio_web text,
    email_contacto varchar(100),
    telefono_contacto varchar(100)
);


    --Activamos RLS 
    ALTER TABLE instituciones ENABLE ROW LEVEL SECURITY;
    --Permisos de lectura
    CREATE POLICY "Todos pueden leer instituciones"
    ON instituciones
    FOR SELECT
    USING(true);