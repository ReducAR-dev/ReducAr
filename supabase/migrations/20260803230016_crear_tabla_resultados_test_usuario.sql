CREATE TABLE resultados_test_usuario(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id integer,
    test_id integer,
    categoria_recomendada_id integer,
    puntaje_total integer,
    resultado text,
    fecha_realizacion timestamp DEFAULT CURRENT_TIMESTAMP,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_test
        FOREIGN KEY (test_id)
        REFERENCES tests(id),

    CONSTRAINT fk_categoria_resultado
        FOREIGN KEY (categoria_recomendada_id)
        REFERENCES categorias(id)
);