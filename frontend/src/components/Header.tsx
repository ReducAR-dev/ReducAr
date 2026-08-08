import { SearchIcon } from "./Icons";

const menuItems = [
  "Inicio",
  "Explorar cursos",
  "Rutas de aprendizaje",
  "Test vocacional",
  "Novedades",
  "Instituciones",
];

function Header() {
  return (
    <header className="home-header">
      <div className="home-header-container">
        <a href="/" className="home-logo">
          <div className="home-logo-symbol">
            <div className="home-logo-circle" />
          </div>
        </a>

        <nav className="home-nav">
          {menuItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`home-nav-link ${
                index === 0 ? "home-nav-link-active" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="home-header-actions">
          <button
            className="home-icon-button"
            type="button"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>

          <button className="home-login-button" type="button">
            Iniciar sesión
          </button>

          <button className="home-register-button" type="button">
            Registrarme
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;