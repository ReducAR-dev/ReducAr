import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Pregunta = { pregunta: string; respuesta: string };
type Seccion = { titulo: string; icono: string; preguntas: Pregunta[] };

const secciones: Seccion[] = [
  {
    titulo: "Sobre ReducAR",
    icono: "✦",
    preguntas: [
      {
        pregunta: "¿Qué es ReducAR?",
        respuesta:
          "ReducAR es una plataforma y red de oportunidades de formación que reúne en un solo lugar cursos, becas, talleres y capacitaciones gratuitas impulsadas por distintas organizaciones e instituciones. Nuestro objetivo es facilitar el acceso a la educación tecnológica y al desarrollo profesional.",
      },
      {
        pregunta: "¿ReducAR dicta sus propios cursos?",
        respuesta:
          "No directamente. ReducAR funciona como un puente entre las personas que buscan capacitarse y las organizaciones que ofrecen oportunidades de formación.",
      },
      {
        pregunta: "¿Tiene algún costo usar la plataforma?",
        respuesta:
          "Por el momento, usar ReducAR es gratuito: podés explorar cursos, hacer el test vocacional y, al crear una cuenta, acceder a funciones como guardar tus cursos favoritos. En el futuro podrían sumarse planes con funciones adicionales.",
      },
    ],
  },
  {
    titulo: "Cuenta, registro y acceso",
    icono: "◉",
    preguntas: [
      {
        pregunta: "¿Por qué debería crear una cuenta en ReducAR?",
        respuesta:
          "Crear una cuenta es gratis y te permite guardar los cursos que te interesan para revisarlos más tarde y acceder a tu perfil.",
      },
      {
        pregunta: "¿Cómo inicio sesión o recupero mi contraseña si la olvidé?",
        respuesta:
          "Podés hacer clic en el botón “Iniciar sesión” en la parte superior derecha de la página. Si no recordás tu contraseña, en el formulario de acceso vas a encontrar la opción “¿Olvidaste tu contraseña?” para restablecerla.",
      },
    ],
  },
  {
    titulo: "Cursos y capacitaciones",
    icono: "◎",
    preguntas: [
      {
        pregunta: "¿Todos los cursos son gratuitos?",
        respuesta:
          "Sí. Por el momento, en ReducAR presentamos únicamente oportunidades de formación gratuitas. Podés usar el filtro “Solo gratuitos” en la sección Explorar cursos para ver solo esas opciones.",
      },
      {
        pregunta: "¿Cómo me inscribo a un curso?",
        respuesta:
          "Cada curso tiene un botón “Inscribirme ahora” que te lleva al formulario o sitio de la institución que lo ofrece. La inscripción y la selección de participantes las gestiona cada organización, no ReducAR.",
      },
      {
        pregunta: "¿Los cursos entregan certificado?",
        respuesta:
          "Depende de la institución que lo organiza. En la tarjeta y en el detalle de cada curso vas a ver la etiqueta “✓ Certificado” si la formación otorga certificación. También podés filtrar la búsqueda según esta opción.",
      },
      {
        pregunta: "¿Qué modalidades de cursada existen?",
        respuesta:
          "Ofrecemos cursos en modalidad virtual, presencial e híbrida. Podés filtrar la búsqueda según la que mejor se adapte a tus tiempos y a tu ubicación.",
      },
    ],
  },
  {
    titulo: "Rutas y orientación",
    icono: "◷",
    preguntas: [
      {
        pregunta: "¿Qué son las rutas de aprendizaje?",
        respuesta:
          "Son recorridos sugeridos que te indican qué cursos hacer y en qué orden, desde los conocimientos iniciales hasta niveles más avanzados en distintas áreas de tecnología.",
      },
      {
        pregunta: "No sé qué área de tecnología elegir, ¿cómo me ayuda ReducAR?",
        respuesta:
          "Te recomendamos hacer nuestro Test de Orientación IT (test vocacional). Con solo 5 preguntas rápidas vas a poder descubrir qué área técnica se adapta mejor a tus gustos e intereses.",
      },
    ],
  },
  {
    titulo: "Novedades y eventos",
    icono: "★",
    preguntas: [
      {
        pregunta: "¿Qué encuentro en la sección de Novedades?",
        respuesta:
          "Publicamos webinars, charlas, talleres en vivo, encuentros comunitarios y conferencias tecnológicas para que sigas aprendiendo, te conectes con la comunidad y te mantengas al día.",
      },
    ],
  },
  {
    titulo: "Organizaciones",
    icono: "⌂",
    preguntas: [
      {
        pregunta:
          "Represento a una organización, ¿puedo publicar nuestros cursos en ReducAR?",
        respuesta:
          "¡Sí! Si tu institución ofrece becas, capacitaciones gratuitas o de impacto social, podés sumarte haciendo clic en el botón “Sumar mi organización” del pie de página o de la sección Instituciones. Nos vamos a poner en contacto para ayudarte a difundir tus oportunidades.",
      },
    ],
  },
  {
    titulo: "Soporte",
    icono: "?",
    preguntas: [
      {
        pregunta: "Tengo un problema técnico o una duda, ¿dónde puedo contactarlos?",
        respuesta:
          "Podés escribirnos desde la sección Contacto o Ayuda, en el pie de página. También tenés a disposición nuestro bot asistente en pantalla para resolver dudas al instante.",
      },
    ],
  },
];

const normalizar = (valor: string): string =>
  valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function PreguntasFrecuentesPage() {
  const [abierta, setAbierta] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const seccionesFiltradas = useMemo(() => {
    const texto = normalizar(busqueda);
    return secciones
      .filter((s) => categoria === "Todas" || s.titulo === categoria)
      .map((s) => ({
        ...s,
        preguntas: s.preguntas.filter(
          (p) =>
            !texto ||
            normalizar(p.pregunta).includes(texto) ||
            normalizar(p.respuesta).includes(texto)
        ),
      }))
      .filter((s) => s.preguntas.length > 0);
  }, [busqueda, categoria]);

  const totalPreguntas = seccionesFiltradas.reduce(
    (total, s) => total + s.preguntas.length,
    0
  );

  const alternar = (id: string) => setAbierta(abierta === id ? null : id);

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text relative overflow-hidden">
      {/* Fondo con gradientes radiales */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(112,72,255,0.16),transparent_25%),radial-gradient(circle_at_8%_40%,rgba(36,204,205,0.08),transparent_22%)] pointer-events-none"
        aria-hidden="true"
      />

      <main className="relative max-w-3xl mx-auto px-4 md:px-8 py-8 pb-20">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 mb-7 text-xs text-reducar-text-secondary">
          <Link to="/" className="hover:text-reducar-primary transition-colors">
            Inicio
          </Link>
          <span>›</span>
          <strong className="text-reducar-primary font-bold">
            Preguntas frecuentes
          </strong>
        </div>

        {/* ENCABEZADO */}
        <header className="flex flex-col items-center text-center">
          <span className="inline-flex items-center px-3.5 py-2 mb-4 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
            ✦ Centro de ayuda
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent">
              frecuentes
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-reducar-text-secondary leading-relaxed">
            Resolvemos las dudas más comunes sobre ReducAR, los cursos y cómo
            aprovechar la plataforma.
          </p>
        </header>

        {/* BUSCADOR */}
        <div className="mt-8 flex items-center gap-2 p-1.5 pl-4 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg focus-within:border-reducar-primary focus-within:ring-2 focus-within:ring-reducar-primary/20 transition-all">
          <span className="shrink-0 text-reducar-primary text-xl" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscá tu duda: inscripción, certificado, cuenta..."
            aria-label="Buscar en preguntas frecuentes"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-reducar-text text-sm py-3"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="h-9 px-3 mr-1 rounded-xl text-xs font-bold text-reducar-primary hover:bg-reducar-primary-light transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* CATEGORÍAS */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Todas", ...secciones.map((s) => s.titulo)].map((nombre) => (
            <button
              key={nombre}
              type="button"
              onClick={() => setCategoria(nombre)}
              className={`px-3.5 py-2 rounded-full text-[11px] font-bold border transition-colors ${
                categoria === nombre
                  ? "bg-reducar-primary text-white border-reducar-primary"
                  : "bg-reducar-surface text-reducar-text-secondary border-reducar-border hover:border-reducar-primary/40 hover:text-reducar-primary"
              }`}
            >
              {nombre}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-reducar-text-secondary">
          {totalPreguntas}{" "}
          {totalPreguntas === 1 ? "pregunta encontrada" : "preguntas encontradas"}
        </p>

        {/* SECCIONES */}
        <div className="mt-6 flex flex-col gap-9">
          {seccionesFiltradas.map((seccion) => (
            <section key={seccion.titulo}>
              <div className="mb-3 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-8 h-8 shrink-0 grid place-items-center rounded-xl bg-reducar-primary-light text-reducar-primary text-sm font-black"
                >
                  {seccion.icono}
                </span>
                <h2 className="text-[11px] font-black tracking-widest text-reducar-primary uppercase">
                  {seccion.titulo}
                </h2>
              </div>

              <div className="flex flex-col gap-2.5">
                {seccion.preguntas.map((item) => {
                  const estaAbierta = abierta === item.pregunta;

                  return (
                    <div
                      key={item.pregunta}
                      className={`bg-reducar-surface border rounded-2xl overflow-hidden transition-all ${
                        estaAbierta
                          ? "border-reducar-primary/50 shadow-lg"
                          : "border-reducar-border hover:border-reducar-primary/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => alternar(item.pregunta)}
                        aria-expanded={estaAbierta}
                        className="w-full p-4 flex items-center justify-between gap-4 text-left text-sm font-bold text-reducar-text hover:text-reducar-primary transition-colors"
                      >
                        {item.pregunta}
                        <span
                          aria-hidden="true"
                          className={`w-7 h-7 shrink-0 grid place-items-center rounded-full text-base transition-all duration-300 ${
                            estaAbierta
                              ? "rotate-45 bg-reducar-primary text-white"
                              : "bg-reducar-primary-light text-reducar-primary"
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          estaAbierta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-4 pb-4 text-sm text-reducar-text-secondary leading-relaxed">
                            {item.respuesta}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* SIN RESULTADOS */}
          {seccionesFiltradas.length === 0 && (
            <div className="py-10 flex flex-col items-center text-center">
              <div className="text-4xl text-reducar-primary" aria-hidden="true">
                ⌕
              </div>
              <h3 className="mt-3 mb-1 text-lg font-bold text-reducar-text">
                No encontramos esa pregunta
              </h3>
              <p className="max-w-sm text-xs text-reducar-text-secondary">
                Probá con otras palabras o escribinos desde Contacto.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBusqueda("");
                  setCategoria("Todas");
                }}
                className="mt-4 px-4 py-2.5 rounded-lg bg-reducar-primary text-white text-xs font-bold"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>

        {/* CIERRE */}
        <div className="mt-14 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="w-12 h-12 shrink-0 grid place-items-center rounded-xl bg-linear-to-br from-reducar-primary to-reducar-turquoise text-white text-lg"
            >
              ✦
            </span>
            <div>
              <span className="text-[9px] font-black tracking-widest text-reducar-primary uppercase">
                ¿Seguís con dudas?
              </span>
              <p className="mt-1 text-sm font-bold text-reducar-text">
                Escribinos y te ayudamos.
              </p>
            </div>
          </div>
          <Link
            to="/contacto"
            className="px-5 py-3 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-sm font-extrabold text-center hover:-translate-y-0.5 hover:shadow-2xl transition-all"
          >
            Ir a Contacto →
          </Link>
        </div>
      </main>
    </div>
  );
}