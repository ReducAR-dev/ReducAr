CREATE TABLE tests(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    descripcion text,
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP
);