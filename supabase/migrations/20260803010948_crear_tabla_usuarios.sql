    --Creamos tabla de usuarios
CREATE TABLE usuarios(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    contraseña_hash varchar(200) NOT NULL,
    fecha_nacimiento date,
    foto_perfil text,
    rol_id integer,
    esta_activo boolean DEFAULT true,
    fecha_registro timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp DEFAULT CURRENT_TIMESTAMP,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(id)
);
