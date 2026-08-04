CREATE TABLE preguntas_test(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    test_id integer,
    pregunta text NOT NULL,
    orden integer ,

    --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
    CONSTRAINT fk_test
        FOREIGN KEY (test_id)
        REFERENCES tests(id)
);