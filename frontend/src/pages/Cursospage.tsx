import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PromoBar from "../components/features/PromoBar";
import CursoDetallePage from "./CursoDetallePage";

export type Curso = {
  titulo: string;
  organizacion: string;
  modalidad: string;
  duracion: string;
  categoria: string;
  nivel: string;
  gratuito: boolean;
  certificado: boolean;
  etiqueta?: string;
  imagen: string;
  descripcion: string;
  descripcionCompleta: string;
  contenido: string[];
  requisitos: string[];
  institucion: string;
  incluye: string[];
  link: string;
};

const cursos: Curso[] = [
  {
    titulo: "Desarrollo Web Full Stack y desarrollo de producto",
    organizacion: "Fundación Pescar",
    modalidad: "Virtual",
    duracion: "6 meses",
    categoria: "Tecnología",
    nivel: "Intermedio",
    gratuito: true,
    certificado: true,
    etiqueta: "Destacado",
    imagen:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Formate en desarrollo web Full Stack y aprendé a crear aplicaciones utilizando tecnologías de Front-End y Back-End.",
    descripcionCompleta:
      "El programa de Desarrollo Web Full Stack brinda herramientas técnicas y profesionales para iniciarse y desarrollarse en el mundo de la tecnología. Durante la formación se trabajan tecnologías de Front-End y Back-End y se desarrollan proyectos para aplicar los conocimientos adquiridos.",
    contenido: [
      "HTML y estructura de páginas web",
      "CSS y diseño de interfaces",
      "JavaScript",
      "React",
      "Desarrollo Front-End",
      "Conceptos de Back-End",
      "Bases de datos",
      "Git y GitHub",
      "Desarrollo de proyectos",
    ],
    requisitos: [
      "Interés por la tecnología y el desarrollo web",
      "Disponibilidad para asistir a las clases",
      "Acceso a computadora e internet",
      "Compromiso con la formación",
    ],
    institucion:
      "Fundación Pescar trabaja en la formación de jóvenes para favorecer su inserción laboral, combinando capacitación técnica con el desarrollo de habilidades profesionales.",
    incluye: [
      "Clases en vivo",
      "Material de estudio",
      "Acompañamiento",
      "Actividades prácticas",
      "Proyecto final",
      "Certificado",
    ],
    link: "https://forms.pescar.org.ar/preinscripcion/ff05401f-bfd4-4476-b0d9-8e0511c99c79",
  },

  {
    titulo: "Programa IT",
    organizacion: "Fundación Empujar",
    modalidad: "Virtual",
    duracion: "5 meses",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
    etiqueta: "Recomendado",
    imagen:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Capacitación orientada al mundo del Testing y al desarrollo de habilidades necesarias para comenzar una carrera en tecnología.",
    descripcionCompleta:
      "Testing Master forma parte de Empujar IT y está orientado a jóvenes interesados en ingresar al sector tecnológico. La propuesta combina conocimientos vinculados al Testing de software con habilidades para el mundo laboral.",
    contenido: [
      "Introducción al Testing",
      "Conceptos de calidad de software",
      "Casos de prueba",
      "Reporte de errores",
      "Testing manual",
      "Metodologías de trabajo",
      "Herramientas digitales",
      "Habilidades para el empleo",
    ],
    requisitos: [
      "Tener interés en ingresar al sector IT",
      "Contar con computadora",
      "Tener conexión a internet",
      "Disponibilidad para participar de las clases",
    ],
    institucion:
      "Fundación Empujar desarrolla programas gratuitos de formación y empleabilidad destinados a jóvenes que buscan incorporarse al mercado laboral.",
    incluye: [
      "Clases online",
      "Capacitación técnica",
      "Formación para el empleo",
      "Actividades prácticas",
      "Acompañamiento",
      "Certificado",
    ],
    link:    "https://www.tfaforms.com/5232921?tfa_211=atemporal_2027_IT_C1_IG",
  },

  {
    titulo: "Programación asistida con IA",
    organizacion: "Chicas en Tecnología",
    modalidad: "Híbrida",
    duracion: "8 semanas",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
    etiqueta: "Nuevo",
    imagen:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Aprendé programación web utilizando HTML, CSS y JavaScript e incorporá inteligencia artificial como herramienta de apoyo.",
    descripcionCompleta:
      "El programa propone una introducción al desarrollo web y al uso de inteligencia artificial aplicada a la programación. Las participantes desarrollan conocimientos técnicos y trabajan en proyectos tecnológicos.",
    contenido: [
      "Introducción a la programación",
      "HTML",
      "CSS",
      "JavaScript",
      "Desarrollo web",
      "Uso de inteligencia artificial",
      "Resolución de problemas",
      "Desarrollo de proyectos",
    ],
    requisitos: [
      "Interés por la tecnología",
      "Cumplir con los requisitos de edad de la convocatoria",
      "Disponibilidad para participar de las actividades",
      "Acceso a computadora e internet",
    ],
    institucion:
      "Chicas en Tecnología es una organización que busca reducir la brecha de género en tecnología y promover la participación de jóvenes mujeres en el sector.",
    incluye: [
      "Clases de programación",
      "Material de estudio",
      "Uso de herramientas de IA",
      "Actividades prácticas",
      "Proyecto tecnológico",
      "Acompañamiento",
    ],
    link:  "https://chicasentecnologia.org/es_ar/curso-programacion/",
  },

  {
    titulo: "Introducción a la programación con Python",
    organizacion: "Santander Open Academy",
    modalidad: "Virtual",
    duracion: "8 horas",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Introducción práctica a Python para aprender conceptos fundamentales de programación desde cero.",
    descripcionCompleta:
      "Este curso permite adquirir conocimientos básicos de programación utilizando Python. Está pensado para personas que desean comenzar en programación y avanzar a su propio ritmo.",
    contenido: [
      "Introducción a Python",
      "Variables",
      "Tipos de datos",
      "Operadores",
      "Condicionales",
      "Bucles",
      "Funciones",
      "Conceptos básicos de programación",
    ],
    requisitos: [
      "No requiere conocimientos previos de programación",
      "Acceso a internet",
      "Computadora o dispositivo compatible",
      "Interés por aprender programación",
    ],
    institucion:
      "Santander Open Academy es una plataforma internacional de formación que ofrece cursos y oportunidades de aprendizaje en distintas áreas profesionales.",
    incluye: [
      "Curso online",
      "Contenido a tu ritmo",
      "Material digital",
      "Ejercicios",
      "Acceso online",
      "Certificado",
    ],
    link:
        "https://app.santanderopenacademy.com/es/course/introduction_to_python_programming",
  },

  {
    titulo: "Tu Futuro + Tecnología",
    organizacion: "Fundación Forge",
    modalidad: "Virtual",
    duracion: "1 año",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Programa gratuito que combina formación tecnológica, habilidades profesionales y preparación para el ingreso al mundo laboral.",
    descripcionCompleta:
      "Tu Futuro + Tecnología acompaña a jóvenes en el desarrollo de competencias necesarias para comenzar su trayectoria profesional en el sector tecnológico y mejorar sus posibilidades de empleabilidad.",
    contenido: [
      "Competencias digitales",
      "Introducción al sector tecnológico",
      "Herramientas digitales",
      "Trabajo colaborativo",
      "Comunicación",
      "Preparación laboral",
      "Desarrollo profesional",
      "Orientación al empleo",
    ],
    requisitos: [
      "Cumplir con el rango de edad de la convocatoria",
      "Interés por trabajar en tecnología",
      "Disponibilidad para realizar la formación",
      "Acceso a internet",
    ],
    institucion:
      "Fundación Forge desarrolla programas de formación y acompañamiento para jóvenes de América Latina con el objetivo de facilitar su acceso al empleo.",
    incluye: [
      "Clases online",
      "Formación tecnológica",
      "Habilidades laborales",
      "Acompañamiento",
      "Orientación laboral",
      "Certificación",
    ],
    link: "https://fforge.org/",
  },

  {
    titulo: "Mujeres Programando Futuro",
    organizacion: "Fundación Media Pila",
    modalidad: "Virtual",
    duracion: "4 meses",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    descripcion:
      "Programa de formación en programación para mujeres que quieran dar sus primeros pasos dentro del sector tecnológico.",
    descripcionCompleta:
      "Mujeres Programando Futuro ofrece herramientas de desarrollo web junto con formación orientada a la empleabilidad. El programa busca acompañar a mujeres que desean comenzar una trayectoria profesional dentro del mundo tecnológico.",
    contenido: [
      "HTML",
      "CSS",
      "JavaScript",
      "Desarrollo web",
      "Inteligencia artificial aplicada",
      "Desarrollo de proyectos",
      "Habilidades personales",
      "Empleabilidad",
    ],
    requisitos: [
      "Cumplir con los requisitos de la convocatoria",
      "Residir en Argentina",
      "Contar con acceso a internet",
      "Interés por iniciarse en tecnología",
    ],
    institucion:
      "Media Pila es una organización social argentina que impulsa la inclusión laboral y económica de mujeres a través de programas de formación.",
    incluye: [
      "Clases virtuales",
      "Capacitación tecnológica",
      "Material de estudio",
      "Actividades prácticas",
      "Formación laboral",
      "Acompañamiento",
    ],
    link:   "https://mediapila.org.ar/cursos/cursos-mujeres-programando/",
  },
];

const normalizeSearchText = (value: string): string =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function Cursospage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("q") ?? "";
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);

  const busqueda = querySearch;
  const [modalidad, setModalidad] = useState("");
  const [nivel, setNivel] = useState("");
  const [soloGratuitos, setSoloGratuitos] = useState(false);
  const [conCertificado, setConCertificado] = useState(false);

  const actualizarBusqueda = (value: string): void => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const cursosFiltrados = useMemo(() => {
    return cursos.filter((curso) => {
      const texto = normalizeSearchText(busqueda);
      const coincideBusqueda =
        normalizeSearchText(curso.titulo).includes(texto) ||
        normalizeSearchText(curso.organizacion).includes(texto) ||
        normalizeSearchText(curso.categoria).includes(texto) ||
        normalizeSearchText(curso.nivel).includes(texto) ||
        normalizeSearchText(curso.descripcion).includes(texto) ||
        normalizeSearchText(curso.descripcionCompleta).includes(texto) ||
        normalizeSearchText(curso.contenido.join(" ")).includes(texto) ||
        normalizeSearchText(curso.incluye.join(" ")).includes(texto);
      const coincideModalidad = !modalidad || curso.modalidad === modalidad;
      const coincideNivel = !nivel || curso.nivel === nivel;
      const coincideGratuito = !soloGratuitos || curso.gratuito;
      const coincideCertificado = !conCertificado || curso.certificado;
      return coincideBusqueda && coincideModalidad && coincideNivel && coincideGratuito && coincideCertificado;
    });
  }, [busqueda, modalidad, nivel, soloGratuitos, conCertificado]);

  const limpiarFiltros = () => {
    setSearchParams({});
    setModalidad("");
    setNivel("");
    setSoloGratuitos(false);
    setConCertificado(false);
  };

  const confirmarBusqueda = (): void => {
    const normalizedSearch = busqueda.trim();
    setSearchParams(normalizedSearch ? { q: normalizedSearch } : {});
  };

  if (cursoSeleccionado) {
    return <CursoDetallePage curso={cursoSeleccionado} onVolver={() => setCursoSeleccionado(null)} />;
  }

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />

      <main>
        <section className="relative overflow-hidden py-8 pb-12 border-b border-reducar-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-reducar-text-secondary mb-7">
              <span>Inicio</span><span>›</span>
              <strong className="text-reducar-primary">Explorar cursos</strong>
            </div>

            <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center px-3.5 py-2 mb-4 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
                ✦ Formación para tu futuro
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
                Explorá cursos y encontrá
                <span className="bg-linear-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> tu próxima oportunidad</span>
              </h1>
              <p className="mt-4 text-sm text-reducar-text-secondary leading-relaxed max-w-xl">
                Descubrí capacitaciones gratuitas y oportunidades de formación ofrecidas por organizaciones e instituciones.
              </p>
            </div>

            <form
              className="max-w-2xl mx-auto mt-7 flex items-center gap-2 p-1.5 pl-4 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg focus-within:border-reducar-primary focus-within:ring-2 focus-within:ring-reducar-primary/20 transition-all"
              onSubmit={(event) => { event.preventDefault(); confirmarBusqueda(); }}
            >
              <span className="shrink-0 text-reducar-primary text-xl" aria-hidden="true">⌕</span>
              <input
                type="text"
                value={busqueda}
                onChange={(event) => actualizarBusqueda(event.target.value)}
                placeholder="Buscar cursos, instituciones o categorías..."
                aria-label="Buscar cursos"
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-reducar-text text-sm py-3"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-sm font-extrabold hover:-translate-y-0.5 transition-all"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        <section className="py-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[245px_minmax(0,1fr)] gap-6 items-start">
            <aside className="p-5 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg">
              <div className="pb-5 flex items-start justify-between gap-3 border-b border-reducar-border">
                <div>
                  <span className="text-[9px] font-black tracking-widest text-reducar-primary">FILTROS</span>
                  <h2 className="mt-1.5 text-base font-extrabold text-white">Filtrá tu búsqueda</h2>
                </div>
                <button type="button" onClick={limpiarFiltros} className="text-xs font-bold text-reducar-primary hover:text-reducar-turquoise">Limpiar</button>
              </div>

              <div className="py-5 border-b border-reducar-border">
                <h3 className="mb-3.5 text-xs font-extrabold text-white">Modalidad</h3>
                {["Virtual", "Presencial", "Híbrida"].map((opcion) => (
                  <label key={opcion} className="flex items-center gap-2.5 mt-3 text-xs text-reducar-text-secondary cursor-pointer">
                    <input type="radio" name="modalidad" checked={modalidad === opcion} onChange={() => setModalidad(opcion)} className="w-4 h-4 accent-reducar-primary" />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>

              <div className="py-5 border-b border-reducar-border">
                <h3 className="mb-3.5 text-xs font-extrabold text-white">Nivel</h3>
                {["Inicial", "Intermedio", "Avanzado"].map((opcion) => (
                  <label key={opcion} className="flex items-center gap-2.5 mt-3 text-xs text-reducar-text-secondary cursor-pointer">
                    <input type="radio" name="nivel" checked={nivel === opcion} onChange={() => setNivel(opcion)} className="w-4 h-4 accent-reducar-primary" />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>

              <div className="py-5 flex items-center justify-between gap-3 border-b border-reducar-border">
                <div>
                  <strong className="block text-xs text-white">Solo gratuitos</strong>
                  <span className="block mt-1 text-[10px] text-reducar-text-secondary">Mostrar cursos sin costo</span>
                </div>
                <label className="relative w-9 h-5 shrink-0">
                  <input type="checkbox" checked={soloGratuitos} onChange={(e) => setSoloGratuitos(e.target.checked)} className="w-0 h-0 opacity-0" />
                  <span className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${soloGratuitos ? "bg-reducar-primary" : "bg-reducar-text-secondary/25"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${soloGratuitos ? "translate-x-4" : ""}`} />
                  </span>
                </label>
              </div>

              <div className="py-5 flex items-center justify-between gap-3">
                <div>
                  <strong className="block text-xs text-white">Con certificado</strong>
                  <span className="block mt-1 text-[10px] text-reducar-text-secondary">Incluyen certificación</span>
                </div>
                <label className="relative w-9 h-5 shrink-0">
                  <input type="checkbox" checked={conCertificado} onChange={(e) => setConCertificado(e.target.checked)} className="w-0 h-0 opacity-0" />
                  <span className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${conCertificado ? "bg-reducar-primary" : "bg-reducar-text-secondary/25"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${conCertificado ? "translate-x-4" : ""}`} />
                  </span>
                </label>
              </div>
            </aside>

            <div className="min-w-0 p-5 bg-reducar-surface border border-reducar-border rounded-2xl">
              <div className="flex items-end justify-between gap-5 mb-5 flex-wrap">
                <div>
                  <span className="text-[9px] font-black tracking-widest text-reducar-primary">CURSOS DISPONIBLES</span>
                  <h2 className="mt-1.5 mb-1 text-2xl font-extrabold text-white tracking-tight">Encontrá la formación ideal para vos</h2>
                  <p className="text-xs text-reducar-text-secondary">
                    {cursosFiltrados.length} {cursosFiltrados.length === 1 ? "curso encontrado" : "cursos encontrados"}
                  </p>
                </div>
                <select className="min-w-41.25 h-10 px-3 text-xs font-semibold bg-reducar-surface border border-reducar-border rounded-lg text-reducar-text outline-none" defaultValue="recomendados" aria-label="Ordenar cursos">
                  <option value="recomendados">Más recomendados</option>
                  <option value="nombre">Nombre A-Z</option>
                  <option value="duracion">Duración</option>
                </select>
              </div>

              {cursosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cursosFiltrados.map((curso) => (
                    <article
                      key={curso.titulo}
                      onClick={() => setCursoSeleccionado(curso)}
                      className="overflow-hidden flex flex-col bg-reducar-surface border border-reducar-border rounded-2xl cursor-pointer hover:-translate-y-1 hover:border-reducar-primary/40 hover:shadow-2xl transition-all"
                    >
                      <div className="relative h-36.25 overflow-hidden bg-reducar-primary-light">
                        <img src={curso.imagen} alt={curso.titulo} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between gap-1.5">
                          {curso.etiqueta && <span className="px-2 py-1.5 text-[10px] font-extrabold text-white bg-reducar-primary rounded-full">{curso.etiqueta}</span>}
                          {curso.gratuito && <span className="px-2 py-1.5 text-[10px] font-extrabold text-white bg-reducar-turquoise-dark rounded-full">Gratuito</span>}
                        </div>
                      </div>
                      <div className="flex-1 p-4 flex flex-col">
                        <span className="w-fit text-[10px] font-extrabold text-reducar-primary">{curso.categoria}</span>
                        <h3 className="mt-2 mb-1 text-base font-bold text-white leading-snug">{curso.titulo}</h3>
                        <p className="m-0 text-xs font-semibold text-reducar-primary underline">{curso.organizacion}</p>
                        <div className="flex gap-2.5 mt-3 pb-3 text-[10px] font-semibold text-reducar-text-secondary">
                          <span>◉ {curso.modalidad}</span>
                          <span>◷ {curso.duracion}</span>
                        </div>
                        <div className="mt-auto pt-2.5 flex items-center justify-between gap-2 border-t border-reducar-border">
                          <div className="flex items-center flex-wrap gap-1.5">
                            <span className="px-2 py-1 text-[10px] font-bold bg-reducar-primary-light text-reducar-primary rounded-lg">{curso.nivel}</span>
                            {curso.certificado && <span className="px-2 py-1 text-[10px] font-bold text-reducar-turquoise-dark bg-reducar-turquoise/10 rounded-lg">✓ Certificado</span>}
                          </div>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setCursoSeleccionado(curso); }} aria-label={`Ver ${curso.titulo}`} className="w-8 h-8 shrink-0 grid place-items-center rounded-full border border-reducar-primary text-reducar-primary hover:bg-reducar-primary hover:text-white transition-colors">→</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="min-h-75 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl text-reducar-primary" aria-hidden="true">⌕</div>
                  <h3 className="mt-3 mb-1 text-lg font-bold text-white">No encontramos cursos</h3>
                  <p className="max-w-sm text-xs text-reducar-text-secondary">Probá modificando tu búsqueda o eliminando algunos filtros.</p>
                  <button type="button" onClick={limpiarFiltros} className="mt-4 px-4 py-2.5 rounded-lg bg-reducar-primary text-white text-xs font-bold">Limpiar filtros</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cursospage;