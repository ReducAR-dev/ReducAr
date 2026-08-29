import { useRef, useState } from "react";
import Header from "../components/common/Header";
import "../styles/login-page.css";

type PanelKey = "usuario" | "institucion";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            Accedé a tu cuenta, ya seas una persona buscando oportunidades o
            una organización gestionando sus programas.
          </p>
        </section>

        <div className="login-wrap">
          <form className="login-card" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="field">
              <label htmlFor="pass">Contraseña</label>
              <input id="pass" type="password" placeholder="••••••••" required />
            </div>

            <div className="form-extra">
              <label className="remember">
                <input type="checkbox" />
                Recordarme
              </label>
              <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn btn-primary">
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
              ¿No tenés cuenta? <a href="/registro">Registrate</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
