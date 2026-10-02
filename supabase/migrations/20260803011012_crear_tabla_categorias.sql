    --Creamos tabla de categorias
CREATE TABLE categorias(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE,
    descripcion text,
    icono_url text
);
