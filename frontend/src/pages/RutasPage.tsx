import { Link } from "react-router-dom";

import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";
import { rutasMock } from "../mocks/testMock";

import "../styles/home-top.css";
import "../styles/rutas.css";

const routeSearchTerms: Record<number, string> = {
  1: "desarrollo web",
  2: "diseño",
  3: "datos",
  4: "ciberseguridad",
};

function RutasPage() {
  return (
    <div className="routes-page">
      <Header />
      <PromoBar />

      <main>
        <section className="routes-hero">
          <div className="routes-container">
            <span className="routes-eyebrow">✦ Aprendizaje paso a paso</span>
            <h1>
              Elegí una ruta y empezá a construir
              <span> tu futuro digital</span>
            </h1>
            <p>
              Explorá recorridos sugeridos para comenzar en distintas áreas de
              tecnología y encontrá cursos relacionados con tus intereses.
            </p>
          </div>
        </section>

        <section className="routes-content">
          <div className="routes-container">
            <div className="routes-grid">
              {rutasMock
                .filter((route) => route.esta_activa)
                .map((route, index) => (
                  <article className="route-card" key={route.id}>
                    <span className="route-card-number">
                      Ruta {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2>{route.titulo}</h2>
                    <p>{route.descripcion}</p>
                    <Link
                      to={`/cursos?q=${encodeURIComponent(
                        routeSearchTerms[route.id] ?? route.titulo,
                      )}`}
                    >
                      Explorar cursos <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
            </div>

            <div className="routes-test-cta">
              <div>
                <span>¿No sabés por dónde empezar?</span>
                <h2>Descubrí el área que mejor se adapta a vos</h2>
                <p>
                  Respondé cinco preguntas y obtené una orientación para elegir
                  tu primera ruta de aprendizaje.
                </p>
              </div>
              <Link to="/test">Hacer test vocacional</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RutasPage;
