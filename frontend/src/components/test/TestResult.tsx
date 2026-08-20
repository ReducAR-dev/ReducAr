type Ruta = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  nivel_id: number;
  categoria_id: number;
  esta_activa: boolean;
};

type TestResultProps = {
  categoria: string;
  puntaje: number;
  ruta: Ruta | null;
};

function TestResult({
  categoria,
  puntaje,
  ruta,
}: TestResultProps) {
  return (
    <section>
      <h2>Resultado del test</h2>

      <p>
        Tu área recomendada es: <strong>{categoria}</strong>
      </p>

      <p>Puntaje obtenido: {puntaje}</p>

      <p>
        Según tus respuestas, esta área puede ser un buen punto de
        partida para tu aprendizaje en tecnología.
      </p>

      {ruta && (
        <div>
          <h3>Ruta recomendada</h3>

          <h4>{ruta.titulo}</h4>

          <p>{ruta.descripcion}</p>
        </div>
      )}
    </section>
  );
}

export default TestResult;