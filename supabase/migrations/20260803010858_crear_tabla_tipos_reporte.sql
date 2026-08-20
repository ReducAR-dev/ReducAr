    --Creamos tabla de tipos_reporte
CREATE TABLE tipos_reporte(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
