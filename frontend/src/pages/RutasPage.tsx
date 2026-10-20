// src/pages/RutasPage.tsx
import { Link } from "react-router-dom";
import PromoBar from "../components/features/PromoBar";
import RouteCard from "../components/ui/RouteCard";
import { rutasMock } from "../mocks/rutas";

const routeSearchTerms: Record<number, string> = {
  1: "desarrollo web", 2: "diseño", 3: "datos", 4: "ciberseguridad",
};

function RutasPage() {
  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />
      <main>
        {/* Cabecera con Breadcrumb y Fondo */}
        <section className="relative overflow-hidden pt-7 pb-14 border-b border-reducar-border bg-[radial-gradient(circle_at_20%_20%,rgba(123,108,246,0.15),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(63,217,201,0.1),transparent_28%)]">
          <div className="max-w-6xl mx-auto px-4">

            {/* Breadcrumb */}
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-5 text-xs font-semibold text-reducar-text-secondary">
                <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
                <span>›</span>
                <strong className="text-reducar-primary">Rutas de aprendizaje</strong>
              </div>
            </div>

            {/* Hero Content */}
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <span className="inline-flex items-center justify-center mb-4 px-4 py-2 text-[10px] font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/35 rounded-full">
                ✦ Aprendizaje paso a paso
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight leading-[1.08] max-w-2xl">
                Elegí una ruta y empezá a construir
                <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> tu futuro digital</span>
              </h1>
              <p className="max-w-2xl mt-4 text-sm text-reducar-text-secondary leading-relaxed">
                Explorá recorridos sugeridos para comenzar en distintas áreas de tecnología y encontrá cursos relacionados con tus intereses.
              </p>
            </div>
          </div>
        </section>

        {/* Listado de Rutas */}
        <section className="py-12 pb-20">
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
          </div>
        </section>
      </main>
    </div>
  );
}

export default RutasPage;