    --Creamos tabla de tipos_certificado
CREATE TABLE tipos_certificado(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
