CREATE TABLE valoraciones_comentarios(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    curso_id integer NOT NULL,
    puntuacion integer NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario text,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,
    esta_aprobada boolean DEFAULT false,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario_id
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    
    CONSTRAINT fk_curso_id
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id),
    -- Relacion unica
    CONSTRAINT uq_usuario_curso_valoracion_comentarios
        UNIQUE (usuario_id,curso_id)

);