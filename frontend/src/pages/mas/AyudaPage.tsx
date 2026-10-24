import { Link } from "react-router-dom";
import chatbotLogo from "../../assets/logo-chatbot.png";

export default function AyudaPage() {
  const openChat = () => document.querySelector<HTMLButtonElement>(".chatbot-launcher")?.click();

  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text pb-24">

      {/* 1. SPLIT HERO (Buscador + RedBot) */}
      <section className="relative overflow-hidden pb-20">

        {/*BREADCRUMB */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
            <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
            <span>›</span>
            <strong className="text-reducar-primary">Cómo funciona</strong>
          </div>
        </div>
        {/* Luz de fondo ambiental */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-reducar-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Columna Izquierda: Buscador */}
            <div>
              <span className="inline-flex rounded-full border border-reducar-primary/20 bg-reducar-primary-light/50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-reducar-primary">
                Centro de Ayuda
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-reducar-text leading-[1.1]">
                ¿Cómo podemos <br className="hidden sm:block" /> ayudarte hoy?
              </h1>
              <p className="mt-5 text-lg text-reducar-text-secondary leading-relaxed max-w-md">
                Encontrá respuestas rápidas a tus dudas o hablá directamente con nuestro asistente virtual 24/7.
              </p>

              {/* Buscador Visual Mejorado */}
              <div className="mt-8 relative max-w-md group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center bg-reducar-surface rounded-2xl border border-reducar-border overflow-hidden focus-within:border-reducar-primary focus-within:ring-2 focus-within:ring-reducar-primary/20 transition-all shadow-sm">
                  <svg className="w-5 h-5 ml-4 text-reducar-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar artículos, contraseñas, cursos..."
                    className="w-full bg-transparent px-4 py-4 text-reducar-text outline-none placeholder:text-reducar-text-secondary/70"
                  />
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta RedBot con Logo */}
            {/* Columna Derecha: Tarjeta RedBot con Logo */}
            <div className="relative flex justify-center perspective-1000">
              {/* Fondo brillante de la tarjeta */}
              <div className="absolute inset-0 bg-linear-to-br from-reducar-primary/20 to-reducar-turquoise-dark/20 rounded-3xl blur-xl transform rotate-3" />

              <div className="relative w-full max-w-sm bg-reducar-surface border border-reducar-border rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center group">
                {/* Animación del Logo del Bot (AHORA REDONDO) */}
                <div className="relative w-28 h-28 mb-6 animate-[breathe_4s_ease-in-out_infinite]">
                  {/* Resplandor detrás de la imagen */}
                  <div className="absolute inset-0 bg-reducar-primary/30 rounded-full blur-md group-hover:bg-reducar-primary/50 transition-colors duration-500" />

                  {/* Imagen redondeada */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
                    <img
                      src={chatbotLogo}
                      alt="RedBot Logo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-reducar-text">RedBot está aquí</h2>
                <p className="mt-2 text-sm text-reducar-text-secondary mb-6">
                  Nuestro asistente virtual puede resolver tus dudas al instante sin hacerte esperar.
                </p>
                <button
                  onClick={openChat}
                  className="w-full rounded-xl bg-reducar-primary px-6 py-3.5 font-bold text-white hover:bg-reducar-primary-dark shadow-lg shadow-reducar-primary/20 hover:shadow-reducar-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  Iniciar chat
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DIRECTORIO DE AYUDA (Grid 2x2 con Hovers Únicos) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-reducar-text">Explorá por categoría</h2>
          <p className="text-reducar-text-secondary">Hacé clic en el tema que necesites para ver más detalles.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Card 1: Primeros Pasos (Hover: Círculo expansivo) */}
          <Link to="/como-funciona" className="group relative overflow-hidden rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* El "semi-circulo" que ahora es un círculo gigante que se expande */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-reducar-primary/10 rounded-full z-0 group-hover:scale-[3] transition-transform duration-700 ease-in-out" />

            <div className="relative z-10 flex items-start gap-5">
              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-reducar-text mb-1 group-hover:text-blue-500 transition-colors">Primeros pasos</h3>
                <p className="text-sm text-reducar-text-secondary leading-relaxed">Aprendé a buscar cursos, usar los filtros y aprovechar al máximo la plataforma.</p>
              </div>
            </div>
          </Link>

          {/* Card 2: FAQs (Hover: Borde iluminado) */}
          <Link to="/preguntas-frecuentes" className="group relative rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-reducar-primary/60 hover:ring-4 hover:ring-reducar-primary/10">
            <div className="flex items-start gap-5">
              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 group-hover:-rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-reducar-text mb-1 group-hover:text-amber-500 transition-colors">Preguntas frecuentes</h3>
                <p className="text-sm text-reducar-text-secondary leading-relaxed">Respuestas rápidas a las dudas más comunes sobre cuentas, inscripciones y certificados.</p>
              </div>
            </div>
          </Link>

          {/* Card 3: Atención Humana (Hover: Fondo de gradiente sutil) */}
          <Link to="/contacto" className="group relative overflow-hidden rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-start gap-5">
              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-reducar-text mb-1 group-hover:text-emerald-500 transition-colors">Contacto y soporte</h3>
                <p className="text-sm text-reducar-text-secondary leading-relaxed">¿Necesitás hablar con una persona real? Conocé los canales de atención disponibles.</p>
              </div>
            </div>
          </Link>

          {/* Card 4: Legal (Hover: Deslizamiento) */}
          <div className="group relative overflow-hidden rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-reducar-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="flex items-start gap-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300">
              <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-reducar-text mb-1">Legal y Privacidad</h3>
                <p className="text-sm text-reducar-text-secondary mb-3">Conocé cómo protegemos tus datos y las condiciones de uso.</p>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-reducar-primary">
                  <Link to="/politicas-privacidad" className="hover:underline">Privacidad</Link>
                  <span className="text-reducar-border">•</span>
                  <Link to="/terminos-condiciones" className="hover:underline">Términos</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Animación para el logo de RedBot */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
      `}</style>
    </main>
  );
}