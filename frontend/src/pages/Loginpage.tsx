import { useRef, useState } from "react";
import Header from "../components/Header";
import "../styles/login-page.css";

type PanelKey = "usuario" | "institucion";

export default function LoginPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>("usuario");
  const userPanelRef = useRef<HTMLFormElement>(null);
  const instPanelRef = useRef<HTMLFormElement>(null);

  const handleToggle = (panel: PanelKey) => {
    setActivePanel(panel);
    const target = panel === "usuario" ? userPanelRef.current : instPanelRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: conectar con el endpoint de login correspondiente
  };

  return (
    <div className="login-page">
      <Header />

      <div className="container">
        <section className="intro">
          <h1>
            Iniciá sesión en <span className="accent">ReducAR</span>
          </h1>
          <p>
            Accedé a tu cuenta para seguir explorando cursos, o gestionar los
            programas de tu organización.
          </p>
        </section>

        <div className="mobile-toggle">
          <button
            type="button"
            className={activePanel === "usuario" ? "active" : ""}
            onClick={() => handleToggle("usuario")}
          >
            Soy persona
          </button>
          <button
            type="button"
            className={activePanel === "institucion" ? "active" : ""}
            onClick={() => handleToggle("institucion")}
          >
            Soy organización
          </button>
        </div>

        <div className="split-wrap">
          <div className="split-card">
            <div className="split-badge">O</div>

            {/* ===== PANEL USUARIO ===== */}
            <form className="panel panel-user" ref={userPanelRef} onSubmit={handleSubmit}>
              <div className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#5B3AF0" strokeWidth="1.8" />
                  <path
                    d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                    stroke="#5B3AF0"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="eyebrow">Para personas</div>
              <h2>Iniciá sesión como usuario</h2>
              <p className="desc">
                Volvé a tus cursos, favoritos y postulaciones en curso.
              </p>

              <div className="field">
                <label htmlFor="uEmail">Correo electrónico</label>
                <input id="uEmail" type="email" placeholder="tu@email.com" required />
              </div>
              <div className="field">
                <label htmlFor="uPass">Contraseña</label>
                <input id="uPass" type="password" placeholder="••••••••" required />
              </div>

              <div className="form-extra">
                <label className="remember">
                  <input type="checkbox" />
                  Recordarme
                </label>
                <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="btn btn-user">
                Iniciar sesión
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="panel-foot">
                ¿No tenés cuenta? <a href="#">Registrate</a>
              </p>
            </form>

            {/* ===== PANEL INSTITUCIÓN ===== */}
            <form className="panel panel-inst" ref={instPanelRef} onSubmit={handleSubmit}>
              <div className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 21V9l8-5 8 5v12" stroke="white" strokeWidth="1.8" fill="none" />
                  <path d="M9 21v-6h6v6" stroke="white" strokeWidth="1.8" fill="none" />
                </svg>
              </div>
              <div className="eyebrow">Para organizaciones</div>
              <h2>Iniciá sesión como institución</h2>
              <p className="desc">
                Gestioná tus cursos publicados y las postulaciones recibidas.
              </p>

              <div className="field">
                <label htmlFor="iEmail">Correo institucional</label>
                <input
                  id="iEmail"
                  type="email"
                  placeholder="contacto@organizacion.org"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="iPass">Contraseña</label>
                <input id="iPass" type="password" placeholder="••••••••" required />
              </div>

              <div className="form-extra">
                <label className="remember">
                  <input type="checkbox" />
                  Recordarme
                </label>
                <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="btn btn-inst">
                Iniciar sesión
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="panel-foot">
                ¿Tu organización no está registrada? <a href="#">Registrala</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
