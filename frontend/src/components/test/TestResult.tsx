type TestResultProps = {
  categoria: string;
  puntaje: number;
};

function TestResult({ categoria, puntaje }: TestResultProps) {
  return (
    <section className="test-result">
      <p className="result-label">Test completado</p>

      <h2 className="result-title">Tu área recomendada</h2>

      <p className="result-category">{categoria}</p>

      <div className="result-score">
        <span>Puntaje obtenido</span>
        <strong>{puntaje}</strong>
      </div>

      <p className="result-description">
        Según tus respuestas, esta área puede ser un buen punto de partida
        para tu aprendizaje en tecnología.
      </p>
    </section>
  );
}

export default TestResult;