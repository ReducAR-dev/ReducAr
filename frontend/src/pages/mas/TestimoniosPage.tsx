import { Link } from "react-router-dom";

const testimonials = [
  { name: "Micaela R.", role: "Estudiante", quote: "Encontré una ruta clara para empezar en tecnología y pude comparar alternativas sin perderme en el intento.", stars: 5 },
  { name: "Lucas T.", role: "En búsqueda de empleo", quote: "Los filtros me ayudaron a ubicar cursos compatibles con mis horarios. Conseguí mi primer trabajo como junior hace poco y la plataforma fue clave.", stars: 5 },
  { name: "Camila G.", role: "Organización Social", quote: "ReducAR hace más simple acercar oportunidades de formación a quienes las necesitan.", stars: 5 },
  { name: "Jorge M.", role: "Estudiante de Diseño", quote: "La interfaz es súper amigable. Pude guardar mis cursos favoritos y organizar mi ruta de aprendizaje.", stars: 4 },
  { name: "Valentina P.", role: "Docente", quote: "Recomiendo la plataforma a todos mis alumnos porque centraliza becas y cursos gratuitos verificados.", stars: 5 },
  { name: "Matías B.", role: "Full Stack Dev", quote: "El test vocacional me sorprendió. Me ayudó a reafirmar que el camino de la programación era para mí.", stars: 5 },
];

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text pb-24">
      {/* 1. HEADER CON LUZ DE FONDO (Sin borde duro) */}
      <section className="relative overflow-hidden pb-16 text-center">
        {/* Orbe de luz difuminado detrás del título */}

        {/* 1. BREADCRUMB */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
            <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
            <span>›</span>
            <strong className="text-reducar-primary">Contacto</strong>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-reducar-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <span className="inline-flex rounded-full border border-reducar-primary/20 bg-reducar-primary-light/50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-reducar-primary">
            Comunidad
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Muro de la fama
          </h1>
          <p className="mt-4 text-lg text-reducar-text-secondary leading-relaxed">
            Historias de personas que transformaron su futuro a través de ReducAR.
          </p>
        </div>
      </section>

      {/* 2. MASONRY GRID CON HOVER ILUMINADO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group relative break-inside-avoid rounded-3xl border border-reducar-border bg-reducar-surface p-6 shadow-sm hover:shadow-2xl hover:border-reducar-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Efecto de Luz interior al hacer Hover */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-reducar-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Comilla gigante (SVG para que se vea más nítida) */}
              <div className="absolute top-4 right-6 text-reducar-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-reducar-primary/20 pointer-events-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Estrellas */}
              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < t.stars ? 'text-amber-400 drop-shadow-sm' : 'text-reducar-border'}`}>
                    ★
                  </span>
                ))}
              </div>

              {/* Texto */}
              <p className="relative z-10 text-reducar-text font-medium leading-relaxed mb-6">
                "{t.quote}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 relative z-10 border-t border-reducar-border pt-5 group-hover:border-reducar-primary/20 transition-colors">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-transparent group-hover:ring-reducar-primary/30 transition-all">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-reducar-text">{t.name}</h4>
                  <p className="text-xs text-reducar-text-secondary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}