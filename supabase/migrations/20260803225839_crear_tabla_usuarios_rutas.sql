CREATE TABLE usuarios_rutas(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    ruta_id integer,
    estado_id integer DEFAULT 0,
    fecha_inicio timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion timestamp,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_ruta
        FOREIGN KEY (ruta_id)
        REFERENCES ruta(id),
    CONSTRAINT fk_estado
        FOREIGN KEY (estado_id)
        REFERENCES estados_curso_usuario(id),
    -- Relacion unica
    CONSTRAINT uq_usuario_ruta
        UNIQUE (usuario_id,ruta_id)    
);