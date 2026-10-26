import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  InfoCard,
  SectionHeading,
  primaryActionClass,
  secondaryActionClass,
} from "../../layouts/StaticPageLayout";
import { colaboracionService } from "../../services/colaboracion.service";

const resources = [
  { icon: "📚", label: "Cursos", path: "/cursos" },
  { icon: "🗺️", label: "Rutas de aprendizaje", path: "/rutas" },
  { icon: "🧭", label: "Test vocacional", path: "/test" },
  { icon: "🏛️", label: "Instituciones", path: "/instituciones" },
  { icon: "📅", label: "Novedades", path: "/novedades" },
];

type TeamPhoto =
  | { kind: "sprite"; x: number; y: number; size: number }
  | {
      kind: "image";
      src: string;
      zoom: number;
      focusX: number;
      focusY: number;
    };

type TeamMember = {
  name: string;
  role: string;
  linkedin: string | null;
  photo: TeamPhoto;
};

const team: TeamMember[] = [
  {
    name: "Gabriela",
    role: "QA",
    linkedin: "https://www.linkedin.com/in/gabriela-galarza-51954b234/",
    photo: { kind: "sprite", x: 80, y: 86, size: 136 },
  },
  {
    name: "Erika",
    role: "QA",
    linkedin: "https://www.linkedin.com/in/erika-llanos-buezo/",
    photo: { kind: "sprite", x: 289, y: 85, size: 136 },
  },
  {
    name: "Jonathan",
    role: "Líder Técnico",
    linkedin: "https://www.linkedin.com/in/jonathanfullstack/",
    photo: { kind: "sprite", x: 737, y: 82, size: 128 },
  },
  {
    name: "Gabriel",
    role: "Full Stack",
    linkedin: "https://www.linkedin.com/in/gabriel-m-baldessari-b94a36205/",
    photo: { kind: "sprite", x: 932, y: 78, size: 128 },
  },
  {
    name: "Maximiliano",
    role: "Back End",
    linkedin: "https://www.linkedin.com/in/maximiliano-lionel-ramirez-b22431377/",
    photo: {
      kind: "image",
      src: "/equipo/maximiliano.png",
      zoom: 1.65,
      focusX: 0.5,
      focusY: 0.32,
    },
  },
  {
    name: "Jasmín",
    role: "Back End",
    linkedin: "https://www.linkedin.com/in/jasmin-cantero-it/",
    photo: {
      kind: "image",
      src: "/equipo/jasmin.png",
      zoom: 1.7,
      focusX: 0.49,
      focusY: 0.31,
    },
  },
  {
    name: "Patricio",
    role: "Back End",
    linkedin: "https://www.linkedin.com/in/patricio-martinez-134273200/",
    photo: {
      kind: "image",
      src: "/equipo/patricio.png",
      zoom: 1.55,
      focusX: 0.5,
      focusY: 0.36,
    },
  },
  {
    name: "Milagros",
    role: "Front End",
    linkedin: "https://www.linkedin.com/in/milagros-toledo-994728357/",
    photo: {
      kind: "image",
      src: "/equipo/milagros.png",
      zoom: 1.5,
      focusX: 0.56,
      focusY: 0.37,
    },
  },
  {
    name: "Florencia",
    role: "Front End",
    linkedin: "https://www.linkedin.com/in/florencia-vilacahua/",
    photo: {
      kind: "image",
      src: "/equipo/florencia.png",
      zoom: 1.45,
      focusX: 0.52,
      focusY: 0.4,
    },
  },
  {
    name: "Gonzalo",
    role: "Front End",
    linkedin: "https://www.linkedin.com/in/gonzalo-pulguer-436b05227/",
    photo: {
      kind: "image",
      src: "/equipo/gonzalo.png",
      zoom: 1.65,
      focusX: 0.52,
      focusY: 0.32,
    },
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

const MONTOS_SUGERIDOS = [500, 1000, 2000, 5000];

export default function NosotrosPage() {
  const [searchParams] = useSearchParams();
  const estadoAporte = searchParams.get("aporte");

  const [monto, setMonto] = useState<number>(1000);
  const [cargandoPago, setCargandoPago] = useState<boolean>(false);
  const [errorPago, setErrorPago] = useState<string | null>(null);

  const handleColaborar = async () => {
    setErrorPago(null);

    if (!Number.isInteger(monto) || monto < 100 || monto > 10000) {
      setErrorPago("Elegí un monto entero entre $100 y $10.000 ARS.");
      return;
    }

    try {
      setCargandoPago(true);
      const respuesta = await colaboracionService.crearPreferencia(monto);
      const urlDestino = respuesta.data.init_point;

      if (urlDestino) {
        window.location.href = urlDestino;
      } else {
        setErrorPago("No se pudo obtener el enlace de Mercado Pago.");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "No se pudo conectar con la pasarela de pago.";
      setErrorPago(msg);
    } finally {
      setCargandoPago(false);
    }
  };

  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text">
      <section className="relative overflow-hidden border-b border-reducar-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(123,108,246,0.2),transparent_34%),radial-gradient(circle_at_86%_80%,rgba(63,217,201,0.16),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-22">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-reducar-primary/25 bg-reducar-primary-light px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-reducar-primary">
              Nosotros
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Conocé a quienes impulsan
              <span className="block bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise bg-clip-text text-transparent">
                ReducAR
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-reducar-text-secondary sm:text-lg sm:leading-8">
              Creamos esta plataforma para conectar personas con oportunidades de formación y ayudar a construir un futuro con más acceso al aprendizaje.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/cursos" className={primaryActionClass}>Explorar oportunidades</Link>
              <Link to="/contacto" className={secondaryActionClass}>Contactarnos</Link>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-center text-xs font-extrabold uppercase tracking-[0.18em] text-reducar-primary">
              Nuestro equipo
            </p>
            <div className="mx-auto mt-7 grid max-w-6xl grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
              {team.map((member) => (
                <article key={member.name} className="group flex w-full max-w-48 flex-col items-center text-center">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-reducar-primary bg-reducar-surface shadow-[0_12px_36px_rgba(18,12,56,0.28)] ring-4 ring-reducar-primary/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_42px_rgba(123,108,246,0.32)] sm:h-36 sm:w-36">
                    <div
                      className="absolute inset-0 rounded-full"
                      role="img"
                      aria-label={`Foto de ${member.name}`}
                    >
                      {member.photo.kind === "image" ? (
                        <img
                          src={member.photo.src}
                          alt=""
                          aria-hidden="true"
                          className="absolute max-w-none object-cover"
                          style={{
                            width: `${member.photo.zoom * 100}%`,
                            height: `${member.photo.zoom * 100}%`,
                            left: `${50 - member.photo.focusX * member.photo.zoom * 100}%`,
                            top: `${50 - member.photo.focusY * member.photo.zoom * 100}%`,
                          }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: "url('/equipo-reducar.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: `${(1172 / member.photo.size) * 100}% ${(575 / member.photo.size) * 100}%`,
                            backgroundPosition: `${(member.photo.x / (1172 - member.photo.size)) * 100}% ${(member.photo.y / (575 - member.photo.size)) * 100}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <h2 className="mt-4 text-lg font-extrabold text-reducar-text">{member.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-reducar-text-secondary">{member.role}</p>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Ver el perfil de LinkedIn de ${member.name}`}
                      className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-reducar-primary/25 bg-reducar-primary-light px-4 py-2 text-sm font-extrabold text-reducar-primary transition hover:-translate-y-0.5 hover:border-reducar-primary/45 hover:bg-reducar-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reducar-primary"
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
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

      {/* SECCIÓN DE APOYO / COLABORACIÓN CON MERCADO PAGO */}
      <section id="apoyar" className="px-4 pb-14 sm:px-6 sm:pb-18 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-reducar-primary/30 bg-reducar-surface p-6 shadow-xl sm:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-reducar-primary/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-reducar-primary">
              💜 Apoyá el proyecto
            </span>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl text-reducar-text">
              Colaborá con el crecimiento de ReducAR
            </h2>
            <p className="mt-2 text-sm sm:text-base text-reducar-text-secondary">
              Tu aporte voluntario nos ayuda a mantener los servidores activos y seguir acercando oportunidades educativas gratuitas a más personas.
            </p>
          </div>

          {estadoAporte === "exito" && (
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              🎉 ¡Muchas gracias por tu aporte! Tu colaboración impulsa a la comunidad de ReducAR.
            </div>
          )}

          {estadoAporte === "error" && (
            <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-center text-sm font-semibold text-red-600 dark:text-red-400">
              El pago fue cancelado o no pudo completarse. Podés intentarlo nuevamente cuando quieras.
            </div>
          )}

          <div className="mt-8 space-y-6">
            {/* Botones rápidos de monto */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-reducar-text-secondary text-center mb-3">
                Elegí un monto o ingresá el tuyo ($100 a $10.000 ARS)
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {MONTOS_SUGERIDOS.map((sugerido) => {
                  const activo = monto === sugerido;
                  return (
                    <button
                      key={sugerido}
                      type="button"
                      onClick={() => {
                        setMonto(sugerido);
                        setErrorPago(null);
                      }}
                      className={`rounded-2xl py-3 px-4 text-sm font-extrabold transition border ${
                        activo
                          ? "bg-reducar-primary text-white border-reducar-primary shadow-lg scale-[1.02]"
                          : "bg-reducar-bg text-reducar-text border-reducar-border hover:border-reducar-primary/50"
                      }`}
                    >
                      ${sugerido.toLocaleString("es-AR")} ARS
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input de monto personalizado + Botón Mercado Pago */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-reducar-text-secondary">
                  $
                </span>
                <input
                  type="number"
                  min={100}
                  max={10000}
                  step={100}
                  value={monto || ""}
                  onChange={(e) => {
                    setMonto(Number(e.target.value));
                    setErrorPago(null);
                  }}
                  placeholder="Otro monto (ej. 1500)"
                  className="w-full rounded-2xl border border-reducar-border bg-reducar-bg pl-8 pr-14 py-3.5 text-sm font-bold text-reducar-text outline-none focus:border-reducar-primary transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-reducar-text-secondary">
                  ARS
                </span>
              </div>

              <button
                type="button"
                onClick={handleColaborar}
                disabled={cargandoPago}
                className="rounded-2xl bg-linear-to-r from-reducar-primary to-reducar-turquoise px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none shrink-0"
              >
                {cargandoPago ? "Redirigiendo..." : "Colaborar con Mercado Pago →"}
              </button>
            </div>

            {errorPago && (
              <p className="text-center text-xs font-semibold text-red-500">
                ⚠️ {errorPago}
              </p>
            )}

            <p className="text-center text-[11px] text-reducar-text-secondary">
              🔒 Aporte voluntario y no reembolsable procesado de forma segura mediante Mercado Pago Checkout Pro.
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
