CREATE TABLE usuarios_rutas(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    rutas_aprendizaje_id integer,
    estado_id integer DEFAULT 0,
    fecha_inicio timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion timestamp,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_rutas_aprendizaje
        FOREIGN KEY (rutas_aprendizaje_id)
        REFERENCES rutas_aprendizaje(id),
    CONSTRAINT fk_estado
        FOREIGN KEY (estado_id)
        REFERENCES estados_curso_usuario(id),
    -- Relacion unica
    CONSTRAINT uq_usuario_ruta
        UNIQUE (usuario_id,rutas_aprendizaje_id)
);