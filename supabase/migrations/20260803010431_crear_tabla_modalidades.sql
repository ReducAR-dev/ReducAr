    --Creamos tabla de modalidades
CREATE TABLE modalidades(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
