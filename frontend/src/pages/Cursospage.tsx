const cursos = [
  {
    titulo: "Python desde Cero",
    organizacion: "Fundación Pescar",
    modalidad: "Virtual",
    duracion: "3 meses",
    categoria: "Tecnología",
    etiqueta: "Nuevo",
    imagen:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Community Manager",
    organizacion: "Junior Achievement",
    modalidad: "Virtual",
    duracion: "4 semanas",
    categoria: "Marketing",
    imagen:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Diseño UX/UI",
    organizacion: "Codo a Codo",
    modalidad: "Virtual",
    duracion: "6 meses",
    categoria: "Diseño",
    etiqueta: "Popular",
    imagen:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Inglés Intermedio",
    organizacion: "Potenciar Argentina",
    modalidad: "Virtual",
    duracion: "4 meses",
    categoria: "Idiomas",
    imagen:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Excel Avanzado",
    organizacion: "Chicas.net",
    modalidad: "Virtual",
    duracion: "2 meses",
    categoria: "Habilidades digitales",
    imagen:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    titulo: "Introducción al SQL",
    organizacion: "Fundación Pescar",
    modalidad: "Virtual",
    duracion: "2 meses",
    categoria: "Tecnología",
    etiqueta: "Nuevo",
    imagen:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
];

function Cursospage() {
  return (
    <div className="explorar-page">

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">◆</div>
          <span>Reduc<span>AR</span></span>
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
                <article className="course-card" key={curso.titulo}>

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

                      {(curso.titulo === "Python desde Cero" ||
                        curso.titulo === "Community Manager") && (
                        <span>Gratuito</span>
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