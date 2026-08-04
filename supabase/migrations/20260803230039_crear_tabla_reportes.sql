CREATE TABLE reportes (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    tipo_reporte_id integer,
    mensaje text NOT NULL,
    entidad_ligada_id integer,
    estado varchar DEFAULT 'pendiente',
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),
    CONSTRAINT fk_tipo_reporte
        FOREIGN KEY (tipo_reporte_id)
        REFERENCES tipos_reporte(id),
    CONSTRAINT fk_entidad_ligada
        FOREIGN KEY (entidad_ligada_id)
        REFERENCES cursos(id)

);