// pages/RutasPage.tsx
import { Link } from "react-router-dom";
import PromoBar from "../components/features/PromoBar";
import RouteCard from "../components/features/RouteCard";
import { rutasMock } from "../mocks/rutas";

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
                  <RouteCard
                    key={route.id}
                    id={route.id}
                    titulo={route.titulo}
                    descripcion={route.descripcion}
                    numero={index + 1}
                    searchTerm={routeSearchTerms[route.id] ?? route.titulo}
                  />
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