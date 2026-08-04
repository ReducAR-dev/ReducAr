CREATE TABLE usuarios_cursos_estado(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    curso_id integer,
    estado_id integer DEFAULT 0,
    fecha_inicio timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion timestamp,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_curso
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id),
    CONSTRAINT fk_estado
        FOREIGN KEY (estado_id)
        REFERENCES estados_curso_usuario(id),
    -- Relacion unica
    CONSTRAINT uq_usuario_curso_estado
        UNIQUE (usuario_id,curso_id)    
);