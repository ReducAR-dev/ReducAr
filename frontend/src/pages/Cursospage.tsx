import logoCursos from "../assets/logo-cursos.png";

const cursos = [
  {
    titulo: "Desarrollo Web Full Stack",
    organizacion: "Fundación Pescar",
    modalidad: "Virtual",
    duracion: "6 meses",
    categoria: "Tecnología",
    etiqueta: "Destacado",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Testing Master",
    organizacion: "Fundación Empujar",
    modalidad: "Virtual",
    duracion: "5 meses",
    categoria: "Tecnología",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Programación asistida con IA",
    organizacion: "Chicas en Tecnología",
    modalidad: "Híbrida",
    duracion: "8 semanas",
    categoria: "Tecnología",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Introducción a la programación con Python",
    organizacion: "Santander Open Academy",
    modalidad: "Virtual",
    duracion: "8 horas",
    categoria: "Tecnología",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Tu Futuro + Tecnología",
    organizacion: "Fundación Forge",
    modalidad: "Virtual",
    duracion: "1 año",
    categoria: "Tecnología",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Mujeres Programando Futuro",
    organizacion: "Fundación Media Pila",
    modalidad: "Virtual",
    duracion: "4 meses",
    categoria: "Tecnología",
    gratuito: true,
    certificado: true,
    imagen:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
  },
];

function Cursospage() {
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
          <a className="active" href="#">Explorar</a>
          <a href="#">Organizaciones</a>
          <a href="#">Rutas</a>
          <a href="#">Test</a>
          <a href="#">Novedades</a>
        </nav>

        <div className="auth-actions">
          <button className="btn-login">Iniciar sesión</button>
          <button className="btn-register">Registrarse</button>
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
                <input type="radio" name="modalidad" />
                Virtual
              </label>

              <label>
                <input type="radio" name="modalidad" />
                Presencial
              </label>

              <label>
                <input type="radio" name="modalidad" />
                Híbrida
              </label>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <strong>Nivel</strong>
                <span>⌃</span>
              </div>

              <label>
                <input type="radio" name="nivel" />
                Inicial
              </label>

              <label>
                <input type="radio" name="nivel" />
                Intermedio
              </label>

              <label>
                <input type="radio" name="nivel" />
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

              <button className="ver-mas">Ver más ›</button>
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
                      <span>◉ {curso.modalidad}</span>
                      <span>•</span>
                      <span>{curso.duracion}</span>
                    </div>

                    <div className="course-tags">

                      <span>{curso.categoria}</span>

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
              <button className="page-active">1</button>
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