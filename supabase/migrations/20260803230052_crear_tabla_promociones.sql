CREATE TABLE promociones (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  curso_id integer NOT NULL,
  descuento_porcentaje integer NOT NULL,
  razon varchar(255),
  imagen_banner_url text,
  fecha_inicio date,
  fecha_finalizacion date,
  orden integer,
  esta_activa boolean DEFAULT true,

  --Definimos relaciones(FOREIGN KEY[LLAVES FORANEAS])
  CONSTRAINT fk_curso
    FOREIGN KEY (curso_id)
    REFERENCES cursos(id)
);