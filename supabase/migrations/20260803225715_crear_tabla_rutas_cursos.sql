CREATE TABLE rutas_cursos(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ruta_id integer,
    curso_id integer,
    orden integer NOT NULL,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_rutas
        FOREIGN KEY (ruta_id)
        REFERENCES ruta(id),

    CONSTRAINT fk_cursos
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id),

    -- Relacion unica
    CONSTRAINT uq_ruta_curso
        UNIQUE (ruta_id,curso_id),
    
    CONSTRAINT uq_ruta_orden
        UNIQUE(ruta_id, orden)
);