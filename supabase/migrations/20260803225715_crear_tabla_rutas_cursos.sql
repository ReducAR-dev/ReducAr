CREATE TABLE rutas_cursos(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rutas_aprendizaje_id integer,
    curso_id integer,
    orden integer NOT NULL,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_rutas_aprendizaje
        FOREIGN KEY (rutas_aprendizaje_id)
        REFERENCES rutas_aprendizaje(id),

    CONSTRAINT fk_cursos
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id),

    -- Relacion unica
    CONSTRAINT uq_ruta_curso
        UNIQUE (rutas_aprendizaje_id,curso_id),
    
    CONSTRAINT uq_ruta_orden
        UNIQUE(rutas_aprendizaje_id, orden)
);