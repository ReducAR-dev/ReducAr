import { Link } from "react-router-dom";

const cursoDestacado = {
  titulo: "Desarrollo Web Full Stack",
  nombre_propietario: "Fundación Pescar",
  descripcion_corta: "Formate en desarrollo web Full Stack y aprendé a crear aplicaciones.",
  imagen_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  precio: "0",
};

const steps = [
  {
    id: 1,
    title: "Explorá",
    icon: "🔍",
    desc: "Buscá cursos, becas y oportunidades por tema, modalidad o nivel en nuestro catálogo.",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "group-hover:border-blue-500/50",
  },
  {
    id: 2,
    title: "Compará",
    icon: "⚖️",
    desc: "Revisá la información clave, guardá tus favoritos y elegí la propuesta que mejor se adapta a vos.",
    color: "from-reducar-primary/20 to-reducar-primary/5",
    borderColor: "group-hover:border-reducar-primary/50",
  },
  {
    id: 3,
    title: "Avanzá",
    icon: "🚀",
    desc: "Inscribite en el curso, seguí tus rutas de aprendizaje y conectate con las instituciones.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "group-hover:border-emerald-500/50",
  },
];

export default function ComoFuncionaPage() {
  const btnPrimary = "inline-flex min-h-11 items-center justify-center rounded-xl bg-reducar-primary px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-reducar-primary/20 transition-all hover:-translate-y-0.5 hover:bg-reducar-primary-dark hover:shadow-xl";
  const btnSecondary = "inline-flex min-h-11 items-center justify-center rounded-xl border border-reducar-border bg-reducar-surface px-6 py-3 text-sm font-extrabold text-reducar-text transition-all hover:border-reducar-primary/40 hover:bg-reducar-primary-light hover:-translate-y-0.5";

  return (
    // Eliminé 'overflow-hidden' de aquí para que el fondo fluya natural
    <main className="min-h-screen bg-reducar-bg text-reducar-text pb-24">

      {/* 1. BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
          <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
          <span>›</span>
          <strong className="text-reducar-primary">Cómo funciona</strong>
        </div>
      </div>

      {/* 2. SPLIT HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <span className="inline-flex rounded-full border border-reducar-primary/20 bg-reducar-primary-light/50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-reducar-primary">
            Paso a paso
          </span>
          <div className="grid items-center gap-16 md:grid-cols-2">

            {/* Texto Izquierda */}
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-reducar-text leading-[1.1]">
                Tu próxima oportunidad, en tres pasos
              </h1>
              <p className="mt-5 text-lg text-reducar-text-secondary leading-relaxed">
                ReducAR reúne información clara para que encontrar una propuesta de formación sea simple, accesible y seguro.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/cursos" className={btnPrimary}>Explorar cursos</Link>
                <Link to="/test" className={btnSecondary}>Test vocacional</Link>
              </div>
            </div>

            {/* Tarjeta del Curso con Animación y Orbe de Fondo */}
            <div className="relative flex justify-center perspective-1000 mt-8 md:mt-0">

              {/* EL ORBE GIGANTE Y DIFUSO (Reemplaza al bloque cuadrado) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-125 max-h-125 bg-linear-to-tr from-blue-400/30 via-indigo-400/20 to-reducar-primary/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />

              {/* Contenedor de la animación de vaivén */}
              <div className="relative w-full max-w-sm animate-[gentle-swing_6s_ease-in-out_infinite] z-10">

                {/* Tarjeta Real */}
                <div className="relative bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300">
                  {/* Imagen del curso */}
                  <div className="h-48 w-full relative overflow-hidden bg-gray-200">
                    <img
                      src={cursoDestacado.imagen_url}
                      alt={cursoDestacado.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {/* Etiqueta de Gratis */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-reducar-text text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {cursoDestacado.precio === "0" ? "100% Gratuito" : `$${cursoDestacado.precio}`}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col gap-2">
                    <span className="text-xs font-bold text-reducar-primary uppercase tracking-wider">
                      {cursoDestacado.nombre_propietario}
                    </span>
                    <h3 className="text-xl font-extrabold text-reducar-text leading-tight">
                      {cursoDestacado.titulo}
                    </h3>
                    <p className="text-sm text-reducar-text-secondary mt-1 line-clamp-2">
                      {cursoDestacado.descripcion_corta}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EL STEPPER */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-reducar-text">Un recorrido simple</h2>
          <p className="mt-2 text-reducar-text-secondary">Podés empezar por una búsqueda directa o dejar que el test te ayude.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Línea punteada horizontal de fondo */}
          <div className="absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-reducar-border/60 hidden md:block -z-10" />

          {steps.map((step) => (
            <div key={step.id} className="relative group flex flex-col items-center text-center">

              {/* Ícono circular */}
              <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-reducar-surface border-2 border-reducar-border text-4xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ${step.borderColor}`}>
                <div className={`absolute inset-1 rounded-full bg-linear-to-br ${step.color}`} />
                <span className="relative z-10">{step.icon}</span>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="mt-6 bg-reducar-surface p-6 rounded-2xl border border-reducar-border w-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-reducar-primary/30 group-hover:shadow-lg">
                <h3 className="text-xl font-extrabold text-reducar-text mb-2">{step.title}</h3>
                <p className="text-sm text-reducar-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animación personalizada del "Péndulo suave" */}
      <style>{`
        @keyframes gentle-swing {
          0% { transform: translateY(0) rotate(-2deg) scale(1); }
          20% { transform: translateY(-6px) rotate(-3.5deg) scale(1.02); }
          50% { transform: translateY(0) rotate(2deg) scale(1); }
          80% { transform: translateY(-6px) rotate(3.5deg) scale(1.02); }
          100% { transform: translateY(0) rotate(-2deg) scale(1); }
        }
      `}</style>
    </main>
  );
}