type TestResultProps = {
  categoria: string;
  puntaje: number;
};

function TestResult({ categoria, puntaje }: TestResultProps) {
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
    </section>
  );
}

export default TestResult;