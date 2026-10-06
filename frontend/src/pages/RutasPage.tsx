// src/pages/RutasPage.tsx
import { Link } from "react-router-dom";
import PromoBar from "../components/features/PromoBar";
import RouteCard from "../components/features/RouteCard";
import { rutasMock } from "../mocks/rutas";

const routeSearchTerms: Record<number, string> = {
  1: "desarrollo web", 2: "diseño", 3: "datos", 4: "ciberseguridad",
};

function RutasPage() {
  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />
      <main>
        <section className="py-16 pb-14 text-center border-b border-reducar-border bg-[radial-gradient(circle_at_20%_20%,rgba(123,108,246,0.15),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(63,217,201,0.1),transparent_28%)]">
          <div className="max-w-6xl mx-auto px-4">
            <span className="inline-block mb-4 text-sm font-extrabold tracking-widest text-reducar-primary uppercase">
              ✦ Aprendizaje paso a paso
            </span>
            <h1 className="max-w-3xl mx-auto mb-5 text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Elegí una ruta y empezá a construir
              <span className="text-reducar-primary"> tu futuro digital</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-reducar-text-secondary leading-relaxed">
              Explorá recorridos sugeridos para comenzar en distintas áreas de tecnología y encontrá cursos relacionados con tus intereses.
            </p>
          </div>
        </section>

        <section className="py-16 pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rutasMock.filter((r) => r.esta_activa).map((route, index) => (
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

            <div className="mt-8 p-8 flex flex-wrap items-center justify-between gap-8 bg-reducar-surface-soft border border-reducar-border rounded-3xl">
              <div>
                <span className="text-xs font-extrabold tracking-widest text-reducar-primary uppercase">¿No sabés por dónde empezar?</span>
                <h2 className="mt-2 mb-2 text-2xl font-extrabold text-white">Descubrí el área que mejor se adapta a vos</h2>
                <p className="m-0 text-reducar-text-secondary text-sm">Respondé cinco preguntas y obtené una orientación para elegir tu primera ruta de aprendizaje.</p>
              </div>
              <Link to="/test" className="shrink-0 px-5 py-3 rounded-xl bg-reducar-primary text-white text-sm font-extrabold hover:bg-reducar-primary-dark transition-colors">
                Hacer test vocacional
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RutasPage;