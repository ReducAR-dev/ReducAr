function CursosPage() {
  return (
    <div className="cursos-page">
      
      <header className="header">
        <div className="logo">
          REDUCAR
        </div>

        <nav>
          <a href="#">Inicio</a>
          <a href="#">Explorar cursos</a>
          <a href="#">Mis cursos</a>
        </nav>

        <button className="perfil">
          Mi perfil
        </button>
      </header>

      <main>
        <section className="bienvenida">
          <h1>Explora cursos</h1>
          <p>
            Encontrá cursos y oportunidades para seguir aprendiendo.
          </p>
        </section>

        <section className="buscador">
          <input
            type="text"
            placeholder="¿Qué querés aprender?"
          />

          <button>Buscar</button>
        </section>

        <section className="categorias">
          <h2>Categorías</h2>

          <div className="categorias-lista">
            <button>Programación</button>
            <button>Marketing</button>
            <button>Diseño</button>
            <button>Administración</button>
          </div>
        </section>

        <section className="cursos">
          <h2>Cursos destacados</h2>

          <div className="cursos-lista">
            
            <article className="curso">
              <h3>Introducción a la programación</h3>
              <p>Aprendé los conceptos básicos de programación.</p>
              <button>Ver curso</button>
            </article>

            <article className="curso">
              <h3>Marketing Digital</h3>
              <p>Conocé herramientas para potenciar tus proyectos.</p>
              <button>Ver curso</button>
            </article>

            <article className="curso">
              <h3>Diseño Digital</h3>
              <p>Aprendé los fundamentos del diseño.</p>
              <button>Ver curso</button>
            </article>

          </div>
        </section>
      </main>

    </div>
  )
}

export default CursosPage