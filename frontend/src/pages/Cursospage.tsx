import { useState } from "react";
import logoCursos from "../assets/Logo-cursos.png";
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
    titulo: "Desarrollo Web Full Stack",
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
    link: "https://www.pescar.org.ar/",
  },

  {
    titulo: "Testing Master",
    organizacion: "Fundación Empujar",
    modalidad: "Virtual",
    duracion: "5 meses",
    categoria: "Tecnología",
    nivel: "Inicial",
    gratuito: true,
    certificado: true,
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
    link: "https://fundacionempujar.org/empujar-it/",
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
    link: "https://chicasentecnologia.org/",
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
      "https://www.santanderopenacademy.com/es/courses/introduction_to_python_programming.html",
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
    link: "https://mediapila.org.ar/",
  },
];

function Cursospage() {
  const [cursoSeleccionado, setCursoSeleccionado] =
    useState<Curso | null>(null);

  if (cursoSeleccionado) {
    return (
      <CursoDetallePage
        curso={cursoSeleccionado}
        onVolver={() => setCursoSeleccionado(null)}
      />
    );
  }

  return (
    <div className="explorar-page">
      <header className="topbar">
        <div className="brand">
          <img
            src={logoCursos}
            alt="Logo de ReducAR"
            className="brand-logo"
          />
        </div>

        <nav className="topnav">
          <a className="active" href="#">
            Explorar
          </a>
          <a href="#">Organizaciones</a>
          <a href="#">Rutas</a>
          <a href="#">Test</a>
          <a href="#">Novedades</a>
        </nav>

        <div className="auth-actions">
          <button className="btn-login">
            Iniciar sesión
          </button>

          <button className="btn-register">
            Registrarse
          </button>
        </div>
      </header>

      <main className="explorar-container">
        <div className="breadcrumb">
          <span>Inicio</span>
          <span>›</span>
          <span>Cursos</span>
        </div>

        <h1>Explorar cursos</h1>

        <div className="content-layout">
          <aside className="sidebar">
            <div className="filter-group">
              <div className="filter-title">
                <strong>Modalidad</strong>
                <span>⌃</span>
              </div>

              <label>
                <input
                  type="radio"
                  name="modalidad"
                />
                Virtual
              </label>

              <label>
                <input
                  type="radio"
                  name="modalidad"
                />
                Presencial
              </label>

              <label>
                <input
                  type="radio"
                  name="modalidad"
                />
                Híbrida
              </label>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <strong>Nivel</strong>
                <span>⌃</span>
              </div>

              <label>
                <input
                  type="radio"
                  name="nivel"
                />
                Inicial
              </label>

              <label>
                <input
                  type="radio"
                  name="nivel"
                />
                Intermedio
              </label>

              <label>
                <input
                  type="radio"
                  name="nivel"
                />
                Avanzado
              </label>
            </div>

            <div className="toggle-row">
              <span>Gratuitos</span>

              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <span>Con certificado</span>

              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <strong>Categorías</strong>
                <span>⌃</span>
              </div>

              {[
                "Tecnología",
                "Marketing",
                "Idiomas",
                "Diseño",
                "Administración",
              ].map((categoria) => (
                <label key={categoria}>
                  <input type="checkbox" />
                  {categoria}
                </label>
              ))}

              <button className="ver-mas">
                Ver más ›
              </button>
            </div>
          </aside>

          <section className="courses-area">
            <div className="search-row">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Buscar cursos..."
                />
              </div>

              <button className="filter-button">
                ☷
                <span>Filtros</span>
              </button>
            </div>

            <div className="course-grid">
              {cursos.map((curso) => (
                <article
                  className="course-card"
                  key={curso.titulo}
                  onClick={() =>
                    setCursoSeleccionado(curso)
                  }
                >
                  <div className="course-image-wrapper">
                    <img
                      src={curso.imagen}
                      alt={curso.titulo}
                      className="course-image"
                    />

                    {curso.etiqueta && (
                      <span className="course-badge">
                        {curso.etiqueta}
                      </span>
                    )}
                  </div>

                  <div className="course-content">
                    <h3>{curso.titulo}</h3>

                    <p className="organization">
                      {curso.organizacion}
                    </p>

                    <div className="course-info">
                      <span>
                        ◉ {curso.modalidad}
                      </span>

                      <span>•</span>

                      <span>
                        {curso.duracion}
                      </span>
                    </div>

                    <div className="course-tags">
                      <span>
                        {curso.categoria}
                      </span>

                      {curso.gratuito && (
                        <span>Gratuito</span>
                      )}

                      {curso.certificado && (
                        <span>Certificado</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pagination">
              <button className="page-active">
                1
              </button>

              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>10</button>
              <button>›</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Cursospage;