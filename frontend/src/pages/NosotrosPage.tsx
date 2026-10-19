import { Link } from "react-router-dom";
import {
  InfoCard,
  SectionHeading,
  primaryActionClass,
  secondaryActionClass,
} from "../components/common/StaticPageLayout";

const resources = [
  { icon: "📚", label: "Cursos", path: "/cursos" },
  { icon: "🗺️", label: "Rutas de aprendizaje", path: "/rutas" },
  { icon: "🧭", label: "Test vocacional", path: "/test" },
  { icon: "🏛️", label: "Instituciones", path: "/instituciones" },
  { icon: "📅", label: "Novedades", path: "/novedades" },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text">
      <section className="relative overflow-hidden border-b border-reducar-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(123,108,246,0.2),transparent_34%),radial-gradient(circle_at_86%_80%,rgba(63,217,201,0.16),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-22">
          <div>
            <span className="inline-flex rounded-full border border-reducar-primary/25 bg-reducar-primary-light px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-reducar-primary">
              Nosotros
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Conocé a quienes impulsan
              <span className="block bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise bg-clip-text text-transparent">
                ReducAR
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-reducar-text-secondary sm:text-lg sm:leading-8">
              Creamos esta plataforma para conectar personas con oportunidades de formación y ayudar a construir un futuro con más acceso al aprendizaje.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/cursos" className={primaryActionClass}>Explorar oportunidades</Link>
              <Link to="/contacto" className={secondaryActionClass}>Contactarnos</Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-r from-reducar-primary/20 to-reducar-turquoise/20 blur-2xl" aria-hidden="true" />
            <img
              src="/foto-grupo.jpg"
              alt="Equipo de ReducAR"
              className="relative aspect-[4/3] w-full rounded-3xl border border-reducar-primary/25 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <SectionHeading
          title="Más que una plataforma, una comunidad"
          description="Reunimos cursos, instituciones y recursos educativos en un solo lugar para facilitar decisiones informadas."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard icon="🎓" title="Aprendé">
            Encontrá cursos, becas y propuestas de formación organizadas de manera clara.
          </InfoCard>
          <InfoCard icon="🧭" title="Orientate">
            Descubrí alternativas alineadas con tus intereses, tiempos y objetivos.
          </InfoCard>
          <InfoCard icon="🚀" title="Crecé">
            Desarrollá habilidades y conectate con nuevas posibilidades para tu futuro.
          </InfoCard>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-18 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-reducar-primary-dark via-reducar-primary to-reducar-turquoise-dark p-6 text-white shadow-2xl sm:p-9 lg:p-11">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/16 text-2xl ring-1 ring-white/25">🎯</div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/75">Nuestra misión</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                  Facilitar el acceso a oportunidades de formación y ayudar a cada persona a encontrar su camino.
                </h2>
              </div>
            </div>
            <p className="border-t border-white/25 pt-6 text-2xl font-semibold italic leading-snug text-white/90 sm:text-3xl lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              “Aprender también es una oportunidad.”
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-reducar-border bg-reducar-surface-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <SectionHeading title="Todo en un mismo lugar" description="Accedé rápidamente a los principales recursos de la plataforma." />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {resources.map((resource) => (
              <Link
                key={resource.path}
                to={resource.path}
                className="group flex min-h-36 flex-col items-center justify-center rounded-2xl border border-reducar-border bg-reducar-surface p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-reducar-primary/40 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-reducar-primary-light text-2xl transition group-hover:scale-105" aria-hidden="true">{resource.icon}</span>
                <span className="mt-3 text-sm font-extrabold text-reducar-text">{resource.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Empezá a explorar oportunidades</h2>
          <p className="mt-3 text-reducar-text-secondary">Tu próximo aprendizaje puede estar a un clic.</p>
          <Link to="/cursos" className={`${primaryActionClass} mt-7`}>Ver cursos disponibles →</Link>
        </div>
      </section>
    </main>
  );
}
