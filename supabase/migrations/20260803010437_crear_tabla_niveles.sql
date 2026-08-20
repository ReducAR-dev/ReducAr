    --Creamos tabla de niveles
CREATE TABLE niveles(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);    
