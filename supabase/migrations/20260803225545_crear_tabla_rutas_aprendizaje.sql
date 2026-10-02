CREATE TABLE rutas_aprendizaje(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo varchar(50) NOT NULL,
    descripcion text NOT NULL,
    imagen_url text,
    nivel_id integer,
    categoria_id integer,
    esta_activa boolean DEFAULT true,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_nivel
        FOREIGN KEY (nivel_id)
        REFERENCES niveles(id),

    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);