import { useState } from "react";
import { Link } from "react-router-dom";

const FECHA_ACTUALIZACION = "[18 de octubre de 2026]";
const EDAD_MINIMA = "18"; // tiene que coincidir con la validación del registro
const CORREO_CONTACTO = "reducar.dev@gmail.com";
const RUTA_PRIVACIDAD = "/politicas-privacidad";
const RUTA_CONTACTO = "/contacto";

type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; items: string[] };

type Seccion = {
  titulo: string;
  bloques: Bloque[];
  enlace?: { texto: string; to: string };
};

const secciones: Seccion[] = [
  {
    titulo: "Qué es ReducAR",
    bloques: [
      {
        tipo: "p",
        texto:
          "ReducAR es una plataforma y red de oportunidades de formación que reúne en un solo lugar cursos, becas, talleres y capacitaciones ofrecidas por distintas organizaciones e instituciones. Nuestro objetivo es facilitar el acceso a la educación tecnológica y al desarrollo profesional.",
      },
      {
        tipo: "p",
        texto: `ReducAR es operada por el equipo de ReducAR (ReducAR-dev). Podés contactarnos en ${CORREO_CONTACTO}.`,
      },
    ],
  },
  {
    titulo: "Rol de ReducAR: conectamos, no dictamos",
    bloques: [
      {
        tipo: "p",
        texto:
          "ReducAR funciona como un puente entre las personas que buscan capacitarse y las organizaciones que ofrecen oportunidades de formación. No dictamos los cursos publicados, no gestionamos las inscripciones y no seleccionamos participantes. Cada institución es responsable de su propuesta, sus requisitos, sus vacantes, sus fechas y sus certificaciones.",
      },
    ],
  },
  {
    titulo: "Cuenta de usuario",
    bloques: [
      {
        tipo: "p",
        texto:
          "Podés explorar parte de la plataforma sin registrarte. Al crear una cuenta accedés a funciones adicionales, como guardar los cursos que te interesan.",
      },
      {
        tipo: "p",
        texto: `ReducAR está destinada a personas mayores de ${EDAD_MINIMA} años. Para crear una cuenta tenés que cumplir con esa edad mínima.`,
      },
      { tipo: "p", texto: "Al registrarte te comprometés a:" },
      {
        tipo: "lista",
        items: [
          "Brindar información verdadera y mantenerla actualizada.",
          "Cuidar tu contraseña y no compartirla con otras personas.",
          "Avisarnos si detectás un uso no autorizado de tu cuenta.",
        ],
      },
      {
        tipo: "p",
        texto: `Podés pedir la baja de tu cuenta escribiéndonos a ${CORREO_CONTACTO}. Si detectamos una cuenta que no cumple con la edad mínima, podemos eliminarla.`,
      },
    ],
  },
  {
    titulo: "Uso permitido",
    bloques: [
      {
        tipo: "p",
        texto:
          "Te comprometés a usar ReducAR de forma responsable. No está permitido:",
      },
      {
        tipo: "lista",
        items: [
          "Usar la plataforma con fines ilegales o para perjudicar a otras personas.",
          "Intentar acceder sin autorización a sistemas, cuentas o datos.",
          "Interferir con el funcionamiento normal del sitio.",
          "Hacerte pasar por otra persona o institución.",
          "Usar el asistente virtual con fines ilícitos o intentar manipularlo para obtener información que no corresponde.",
          "Copiar o reutilizar contenidos de la plataforma con fines comerciales sin autorización.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Podemos suspender o eliminar las cuentas que incumplan estas reglas.",
      },
    ],
  },
  {
    titulo: "Cursos y contenidos de terceros",
    bloques: [
      {
        tipo: "p",
        texto:
          "La información de cada curso (descripción, duración, modalidad, requisitos, certificación y enlaces) es provista por las instituciones u obtenida de sus sitios oficiales. Hacemos lo posible por mantenerla actualizada, pero ReducAR no garantiza que sea completa o vigente, que existan vacantes disponibles, que la inscripción sea aceptada ni los resultados de cada formación.",
      },
      {
        tipo: "p",
        texto:
          "Antes de inscribirte, te recomendamos verificar los datos en el sitio oficial de la institución.",
      },
    ],
  },
  {
    titulo: "Enlaces externos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Al hacer clic en “Inscribirme ahora” u otros enlaces, salís de ReducAR y pasás a un sitio que no controlamos. Allí rigen los términos y la política de privacidad de esa institución. ReducAR no se responsabiliza por el contenido ni por el tratamiento de datos que realicen esos sitios.",
      },
    ],
  },
  {
    titulo: "Organizaciones e instituciones",
    bloques: [
      {
        tipo: "p",
        texto:
          "Las organizaciones que publican oportunidades en ReducAR son responsables de que la información sea veraz, esté actualizada y cumpla con la normativa aplicable. ReducAR puede modificar o retirar publicaciones que sean incorrectas, engañosas o que no correspondan a la finalidad de la plataforma.",
      },
    ],
  },
  {
    titulo: "Test vocacional",
    bloques: [
      {
        tipo: "p",
        texto:
          "El test de orientación es una herramienta orientativa. Sus resultados no reemplazan el asesoramiento de profesionales y pueden no ser exactos.",
      },
    ],
  },
  {
    // CONFIRMAR: alcance y funciones del asistente, y proveedor de IA.
    titulo: "Asistente virtual con inteligencia artificial",
    bloques: [
      {
        tipo: "p",
        texto:
          "El asistente virtual de ReducAR incorpora inteligencia artificial para ayudarte a resolver dudas sobre la plataforma y las oportunidades de formación.",
      },
      {
        tipo: "p",
        texto:
          "Las respuestas se generan de forma automática: pueden contener errores, estar incompletas o desactualizadas, y no reemplazan la información oficial de cada institución ni el asesoramiento de profesionales. Antes de tomar una decisión, verificá los datos en el sitio oficial correspondiente.",
      },
      {
        tipo: "p",
        texto:
          "Para generar las respuestas, los mensajes que escribís pueden ser procesados por un proveedor externo de inteligencia artificial. Te recomendamos no compartir en el chat datos personales sensibles ni información confidencial.",
      },
      {
        tipo: "p",
        texto:
          "Podemos modificar, limitar o suspender el asistente virtual en cualquier momento.",
      },
    ],
  },
  {
    titulo: "Propiedad intelectual",
    bloques: [
      {
        tipo: "p",
        texto:
          "El diseño, la marca, los textos y el código de ReducAR pertenecen a ReducAR, salvo indicación en contrario. Los nombres, logos e imágenes de las instituciones pertenecen a sus respectivos titulares y se muestran para identificar sus propuestas.",
      },
    ],
  },
  {
    titulo: "Privacidad y almacenamiento de datos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Los datos que cargás al registrarte se almacenan y procesan a través de Supabase, el proveedor de almacenamiento y autenticación que usamos, incluida tu contraseña. Cómo tratamos tus datos, para qué los usamos y cuáles son tus derechos se explica en la Política de privacidad.",
      },
    ],
    enlace: { texto: "Leer la Política de privacidad →", to: RUTA_PRIVACIDAD },
  },
  {
    titulo: "Gratuidad, expansión y cambios futuros",
    bloques: [
      {
        tipo: "p",
        texto:
          "Por el momento, el uso de ReducAR es gratuito y solo se publican oportunidades de formación sin costo.",
      },
      {
        tipo: "p",
        texto:
          "ReducAR es un proyecto en desarrollo y planea expandirse. Podemos agregar, modificar o retirar funciones (por ejemplo, incorporar planes con funciones adicionales). Cuando lo hagamos, vamos a actualizar estos términos y, si corresponde, la Política de privacidad.",
      },
    ],
  },
  {
    titulo: "Limitación de responsabilidad",
    bloques: [
      {
        tipo: "p",
        texto:
          "ReducAR se ofrece “tal como está”. No garantizamos que el servicio funcione sin interrupciones o errores. La información de los cursos es provista por las instituciones y, en la medida permitida por la ley, ReducAR no se responsabiliza por decisiones tomadas a partir de esa información, por las respuestas generadas por el asistente virtual ni por la participación en cursos de terceros.",
      },
    ],
  },
  {
    // NOTA PARA REVISIÓN LEGAL: no se incluyó una cláusula de renuncia a acciones colectivas
    // porque en Argentina puede considerarse abusiva y tenerse por no convenida. Consultar.
    titulo: "Consultas y reclamos",
    bloques: [
      {
        tipo: "p",
        texto: `Si tenés una consulta o un reclamo, escribinos a ${CORREO_CONTACTO} y vamos a intentar resolverlo. Esto no limita los derechos que la ley te reconoce.`,
      },
    ],
  },
  {
    titulo: "Cambios en estos términos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Podemos modificar estos términos. Cuando lo hagamos, vamos a actualizar la fecha que figura al inicio de esta página. El uso de la plataforma después de los cambios implica su aceptación.",
      },
    ],
  },
  {
    titulo: "Ley aplicable y contacto",
    bloques: [
      {
        tipo: "p",
        texto: `Estos términos se rigen por las leyes de la República Argentina. Ante cualquier duda o consulta, escribinos a ${CORREO_CONTACTO} o desde la sección Contacto del sitio.`,
      },
    ],
  },
];

const destacados = [
  {
    icono: "◎",
    titulo: `Mayores de ${EDAD_MINIMA}`,
    texto: "Para crear una cuenta hay que cumplir con la edad mínima.",
  },
  {
    icono: "✓",
    titulo: "Uso gratuito",
    texto: "Por el momento, todas las oportunidades publicadas son sin costo.",
  },
  {
    icono: "↗",
    titulo: "Conectamos, no dictamos",
    texto: "Los cursos y las inscripciones los gestiona cada institución.",
  },
];

export default function TerminosCondicionesPage() {
  // Guarda las posiciones de las secciones abiertas (la primera arranca abierta)
  const [abiertas, setAbiertas] = useState<number[]>([0]);

  const todasAbiertas = abiertas.length === secciones.length;

  const alternar = (i: number) =>
    setAbiertas((actuales) =>
      actuales.includes(i)
        ? actuales.filter((n) => n !== i)
        : [...actuales, i]
    );

  const alternarTodas = () =>
    setAbiertas(todasAbiertas ? [] : secciones.map((_, i) => i));

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
            Términos y condiciones
          </strong>
        </div>

        {/* ENCABEZADO */}
        <header className="flex flex-col items-center text-center">
          <span className="inline-flex items-center px-3.5 py-2 mb-4 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
            ✦ Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Términos y{" "}
            <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent">
              condiciones
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-reducar-text-secondary leading-relaxed">
            Te damos la bienvenida a ReducAR. Estos términos explican cómo
            funciona la plataforma y qué se espera de quienes la usan. Al
            navegar el sitio o crear una cuenta, aceptás lo que se detalla a
            continuación.
          </p>
          <p className="mt-3 text-xs font-bold text-reducar-text-secondary">
            Última actualización: {FECHA_ACTUALIZACION}
          </p>
        </header>

        {/* LO ESENCIAL */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {destacados.map((item) => (
            <div
              key={item.titulo}
              className="p-4 flex flex-col gap-2 bg-reducar-surface border border-reducar-border rounded-2xl bg-linear-to-br from-reducar-primary-light/40 to-reducar-surface"
            >
              <span
                aria-hidden="true"
                className="w-9 h-9 grid place-items-center rounded-xl bg-reducar-primary-light text-reducar-primary text-sm font-black"
              >
                {item.icono}
              </span>
              <strong className="text-sm font-bold text-reducar-text">
                {item.titulo}
              </strong>
              <p className="m-0 text-[11px] text-reducar-text-secondary leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>

        {/* CONTROLES */}
        <div className="mt-10 mb-4 flex items-center justify-between gap-4">
          <span className="text-[10px] font-black tracking-widest text-reducar-primary uppercase">
            {secciones.length} secciones
          </span>
          <button
            type="button"
            onClick={alternarTodas}
            className="px-3.5 py-2 rounded-full border border-reducar-border bg-reducar-surface text-[11px] font-bold text-reducar-primary hover:border-reducar-primary/40 hover:bg-reducar-primary-light transition-colors"
          >
            {todasAbiertas ? "Contraer todo" : "Expandir todo"}
          </button>
        </div>

        {/* TÉRMINOS DESPLEGABLES */}
        <div className="flex flex-col gap-2.5">
          {secciones.map((seccion, i) => {
            const abierta = abiertas.includes(i);
            const numero = String(i + 1).padStart(2, "0");

            return (
              <section
                key={seccion.titulo}
                id={`seccion-${i + 1}`}
                className={`scroll-mt-24 bg-reducar-surface border rounded-2xl overflow-hidden transition-all ${
                  abierta
                    ? "border-reducar-primary/50 shadow-lg"
                    : "border-reducar-border hover:border-reducar-primary/30"
                }`}
              >
                <h2>
                  <button
                    type="button"
                    onClick={() => alternar(i)}
                    aria-expanded={abierta}
                    aria-controls={`contenido-${i + 1}`}
                    className="w-full p-4 md:p-5 flex items-center gap-3 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`w-8 h-8 shrink-0 grid place-items-center rounded-xl text-[11px] font-black transition-colors ${
                        abierta
                          ? "bg-reducar-primary text-white"
                          : "bg-reducar-primary-light text-reducar-primary"
                      }`}
                    >
                      {numero}
                    </span>
                    <span
                      className={`flex-1 text-sm md:text-base font-bold transition-colors ${
                        abierta ? "text-reducar-primary" : "text-reducar-text"
                      }`}
                    >
                      {seccion.titulo}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 shrink-0 grid place-items-center rounded-full text-base transition-all duration-300 ${
                        abierta
                          ? "rotate-45 bg-reducar-primary text-white"
                          : "bg-reducar-primary-light text-reducar-primary"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h2>

                <div
                  id={`contenido-${i + 1}`}
                  className={`grid transition-all duration-300 ease-out ${
                    abierta ? "grid-rows-[1fr]" : "grid-rows-[0fr] invisible"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 md:pl-16 flex flex-col gap-3">
                      {seccion.bloques.map((bloque, j) =>
                        bloque.tipo === "p" ? (
                          <p
                            key={j}
                            className="text-sm text-reducar-text-secondary leading-loose"
                          >
                            {bloque.texto}
                          </p>
                        ) : (
                          <ul key={j} className="flex flex-col gap-2">
                            {bloque.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-sm text-reducar-text-secondary leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-reducar-primary"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      )}

                      {seccion.enlace && (
                        <Link
                          to={seccion.enlace.to}
                          className="w-fit text-xs font-extrabold text-reducar-primary hover:underline"
                        >
                          {seccion.enlace.texto}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CIERRE */}
        <div className="mt-12 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="w-12 h-12 shrink-0 grid place-items-center rounded-xl bg-linear-to-br from-reducar-primary to-reducar-turquoise text-white text-lg"
            >
              ✦
            </span>
            <div>
              <span className="text-[9px] font-black tracking-widest text-reducar-primary uppercase">
                ¿Tenés dudas sobre estos términos?
              </span>
              <p className="mt-1 text-sm font-bold text-reducar-text">
                Escribinos y te ayudamos.
              </p>
            </div>
          </div>
          <Link
            to={RUTA_CONTACTO}
            className="px-5 py-3 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-sm font-extrabold text-center hover:-translate-y-0.5 hover:shadow-2xl transition-all"
          >
            Ir a Contacto →
          </Link>
        </div>
      </main>
    </div>
  );
}