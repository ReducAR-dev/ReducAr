    --Creamos tabla de estados_rutas_usuario
CREATE TABLE estados_ruta_usuario(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE
);
