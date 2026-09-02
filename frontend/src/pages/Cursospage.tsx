
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";
import CursoDetallePage from "./CursoDetallePage";

import "../styles/cursos.css";

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
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function Cursospage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("q") ?? "";
  const [cursoSeleccionado, setCursoSeleccionado] =
    useState<Curso | null>(null);

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

      const coincideModalidad =
        !modalidad || curso.modalidad === modalidad;

      const coincideNivel =
        !nivel || curso.nivel === nivel;

      const coincideGratuito =
        !soloGratuitos || curso.gratuito;

      const coincideCertificado =
        !conCertificado || curso.certificado;

      return (
        coincideBusqueda &&
        coincideModalidad &&
        coincideNivel &&
        coincideGratuito &&
        coincideCertificado
      );
    });
  }, [
    busqueda,
    modalidad,
    nivel,
    soloGratuitos,
    conCertificado,
  ]);

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
    return (
      <CursoDetallePage
        curso={cursoSeleccionado}
        onVolver={() => setCursoSeleccionado(null)}
      />
    );
  }

  return (
    <div className="courses-page">
      <Header />
      <PromoBar />

      <main>
        <section className="courses-hero">
          <div className="courses-container">
            <div className="courses-breadcrumb">
              <span>Inicio</span>
              <span>›</span>
              <strong>Explorar cursos</strong>
            </div>

            <div className="courses-heading">
              <span className="courses-eyebrow">
                ✦ Formación para tu futuro
              </span>

              <h1>
                Explorá cursos y encontrá
                <span> tu próxima oportunidad</span>
              </h1>

              <p>
                Descubrí capacitaciones gratuitas y oportunidades de
                formación ofrecidas por organizaciones e instituciones.
              </p>
            </div>

            <form
              className="courses-main-search"
              onSubmit={(event) => {
                event.preventDefault();
                confirmarBusqueda();
              }}
            >
              <span
                className="courses-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="text"
                value={busqueda}
                onChange={(event) =>
                  actualizarBusqueda(event.target.value)
                }
                placeholder="Buscar cursos, instituciones o categorías..."
                aria-label="Buscar cursos"
              />

              <button type="submit">Buscar</button>
            </form>
          </div>
        </section>

        <section className="courses-content-section">
          <div className="courses-container courses-layout">
            <aside className="courses-sidebar">
              <div className="courses-filter-heading">
                <div>
                  <span className="courses-filter-label">
                    FILTROS
                  </span>

                  <h2>Filtrá tu búsqueda</h2>
                </div>

                <button
                  type="button"
                  className="courses-clear"
                  onClick={limpiarFiltros}
                >
                  Limpiar
                </button>
              </div>

              <div className="courses-filter-group">
                <h3>Modalidad</h3>

                {["Virtual", "Presencial", "Híbrida"].map(
                  (opcion) => (
                    <label key={opcion}>
                      <input
                        type="radio"
                        name="modalidad"
                        checked={modalidad === opcion}
                        onChange={() =>
                          setModalidad(opcion)
                        }
                      />

                      <span>{opcion}</span>
                    </label>
                  )
                )}
              </div>

              <div className="courses-filter-group">
                <h3>Nivel</h3>

                {["Inicial", "Intermedio", "Avanzado"].map(
                  (opcion) => (
                    <label key={opcion}>
                      <input
                        type="radio"
                        name="nivel"
                        checked={nivel === opcion}
                        onChange={() =>
                          setNivel(opcion)
                        }
                      />

                      <span>{opcion}</span>
                    </label>
                  )
                )}
              </div>

              <div className="courses-switch-row">
                <div>
                  <strong>Solo gratuitos</strong>
                  <span>Mostrar cursos sin costo</span>
                </div>

                <label className="courses-switch">
                  <input
                    type="checkbox"
                    checked={soloGratuitos}
                    onChange={(event) =>
                      setSoloGratuitos(
                        event.target.checked
                      )
                    }
                  />

                  <span className="courses-slider" />
                </label>
              </div>

              <div className="courses-switch-row">
                <div>
                  <strong>Con certificado</strong>
                  <span>Incluyen certificación</span>
                </div>

                <label className="courses-switch">
                  <input
                    type="checkbox"
                    checked={conCertificado}
                    onChange={(event) =>
                      setConCertificado(
                        event.target.checked
                      )
                    }
                  />

                  <span className="courses-slider" />
                </label>
              </div>
            </aside>

            <div className="courses-results">
              <div className="courses-results-top">
                <div>
                  <span className="courses-results-label">
                    CURSOS DISPONIBLES
                  </span>

                  <h2>
                    Encontrá la formación ideal para vos
                  </h2>

                  <p>
                    {cursosFiltrados.length}{" "}
                    {cursosFiltrados.length === 1
                      ? "curso encontrado"
                      : "cursos encontrados"}
                  </p>
                </div>

                <select
                  className="courses-order"
                  defaultValue="recomendados"
                  aria-label="Ordenar cursos"
                >
                  <option value="recomendados">
                    Más recomendados
                  </option>

                  <option value="nombre">
                    Nombre A-Z
                  </option>

                  <option value="duracion">
                    Duración
                  </option>
                </select>
              </div>

              {cursosFiltrados.length > 0 ? (
                <div className="courses-grid">
                  {cursosFiltrados.map((curso) => (
                    <article
                      className="courses-card"
                      key={curso.titulo}
                      onClick={() =>
                        setCursoSeleccionado(curso)
                      }
                    >
                      <div className="courses-card-image">
                        <img
                          src={curso.imagen}
                          alt={curso.titulo}
                        />

                        <div className="courses-card-badges">
                          {curso.etiqueta && (
                            <span className="courses-badge courses-badge-featured">
                              {curso.etiqueta}
                            </span>
                          )}

                          {curso.gratuito && (
                            <span className="courses-badge">
                              Gratuito
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="courses-card-content">
                        <span className="courses-category">
                          {curso.categoria}
                        </span>

                        <h3>{curso.titulo}</h3>

                        <p className="courses-organization">
                          {curso.organizacion}
                        </p>

                        <p className="courses-description">
                          {curso.descripcion}
                        </p>

                        <div className="courses-card-info">
                          <span>
                            ◉ {curso.modalidad}
                          </span>

                          <span>
                            ◷ {curso.duracion}
                          </span>
                        </div>

                        <div className="courses-card-footer">
                          <div>
                            <span className="courses-level">
                              {curso.nivel}
                            </span>

                            {curso.certificado && (
                              <span className="courses-certificate">
                                ✓ Certificado
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setCursoSeleccionado(curso);
                            }}
                            aria-label={`Ver ${curso.titulo}`}
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="courses-empty">
                  <div aria-hidden="true">⌕</div>

                  <h3>No encontramos cursos</h3>

                  <p>
                    Probá modificando tu búsqueda o
                    eliminando algunos filtros.
                  </p>

                  <button
                    type="button"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </button>
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
