    --Creamos tabla de estados_curso_usuario
CREATE TABLE estados_curso_usuario(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
