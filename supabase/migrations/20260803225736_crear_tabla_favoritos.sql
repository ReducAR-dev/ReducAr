CREATE TABLE favoritos(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    curso_id integer,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_curso
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id),
    -- Relacion unica
    CONSTRAINT uq_usuario_curso_favoritostable
        UNIQUE (usuario_id,curso_id)    
);