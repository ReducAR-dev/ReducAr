CREATE TABLE opciones_test(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pregunta_id integer,
    texto text NOT NULL,
    puntaje integer NOT NULL,
    categoria_resultado_id integer,
    orden integer ,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_pregunta
        FOREIGN KEY (pregunta_id)
        REFERENCES preguntas_test(id),
    CONSTRAINT fk_categoria_resultado
        FOREIGN KEY (categoria_resultado_id)
        REFERENCES categorias(id)
);