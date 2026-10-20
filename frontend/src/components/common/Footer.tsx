import { Link } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";

export const Footer = () => {
  return (
    <footer className="relative bg-reducar-shell-bg text-reducar-shell-text overflow-hidden border-t border-white/10">
      
      {/* 🌟 EFECTO DE LUCES DIFUMINADAS (Para marcar el fin del sitio) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-[radial-gradient(ellipse_at_top_left,rgba(123,108,246,0.15),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(63,217,201,0.15),transparent_50%)] pointer-events-none" aria-hidden="true" />

      {/* PATRÓN IZQUIERDO */}
      <svg className="absolute left-0 top-0 bottom-0 w-75 pointer-events-none opacity-90 hidden lg:block" viewBox="0 0 300 400" aria-hidden="true">
        <line x1="40" y1="60" x2="140" y2="120" stroke="rgba(120,130,220,0.35)" strokeWidth="1" />
        <line x1="140" y1="120" x2="90" y2="220" stroke="rgba(120,130,220,0.35)" strokeWidth="1" />
        <line x1="90" y1="220" x2="180" y2="300" stroke="rgba(120,130,220,0.35)" strokeWidth="1" />
        <line x1="40" y1="60" x2="90" y2="220" stroke="rgba(120,130,220,0.35)" strokeWidth="1" />
        <line x1="140" y1="120" x2="220" y2="180" stroke="rgba(120,130,220,0.35)" strokeWidth="1" />
        <circle cx="40" cy="60" r="5" fill="rgba(120,130,220,0.35)" />
        <circle cx="140" cy="120" r="7" fill="rgba(120,130,220,0.35)" />
        <circle cx="90" cy="220" r="4" fill="rgba(120,130,220,0.35)" />
        <circle cx="180" cy="300" r="6" fill="rgba(120,130,220,0.35)" />
        <circle cx="220" cy="180" r="5" fill="rgba(120,130,220,0.35)" />
      </svg>

      {/* ✨ PATRÓN DERECHO */}
      <svg className="absolute right-0 top-0 bottom-0 w-75 pointer-events-none opacity-90 hidden lg:block" viewBox="0 0 300 400" aria-hidden="true">
        <line x1="260" y1="80" x2="160" y2="180" stroke="rgba(63,217,201,0.25)" strokeWidth="1" />
        <line x1="160" y1="180" x2="200" y2="280" stroke="rgba(63,217,201,0.25)" strokeWidth="1" />
        <line x1="260" y1="80" x2="200" y2="280" stroke="rgba(63,217,201,0.25)" strokeWidth="1" />
        <line x1="160" y1="180" x2="80" y2="260" stroke="rgba(63,217,201,0.25)" strokeWidth="1" />
        <circle cx="260" cy="80" r="6" fill="rgba(63,217,201,0.3)" />
        <circle cx="160" cy="180" r="8" fill="rgba(63,217,201,0.3)" />
        <circle cx="200" cy="280" r="5" fill="rgba(63,217,201,0.3)" />
        <circle cx="80" cy="260" r="4" fill="rgba(63,217,201,0.3)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-10">
          
          {/* Columna 1: marca + redes */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2" aria-label="Ir al inicio">
              <img src={logoReducar} alt="" className="h-10 w-auto" aria-hidden="true" />
              <span className="text-2xl font-extrabold text-white">
                Reduc<span className="text-reducar-turquoise">AR</span>
              </span>
            </Link>
            <p className="text-reducar-shell-text text-lg font-semibold sm:text-sm sm:font-normal">Tu red de oportunidades</p>
            <p className="text-reducar-shell-text-secondary text-base sm:text-sm leading-relaxed">
              Conectamos personas con organizaciones que ofrecen oportunidades
              de formación gratuita para impulsar el aprendizaje y el
              desarrollo profesional.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/30 text-reducar-shell-text hover:border-reducar-turquoise hover:text-reducar-turquoise transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/30 text-reducar-shell-text hover:border-reducar-turquoise hover:text-reducar-turquoise transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/30 text-reducar-shell-text hover:border-reducar-turquoise hover:text-reducar-turquoise transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><path d="M14 8h1.5M14 8a2 2 0 0 0-2 2v9M10 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div className="space-y-1 sm:space-y-4">
            <h4 className="text-white font-extrabold text-xl sm:text-sm mt-6 sm:mt-0 mb-3 sm:mb-0">Explorar</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/cursos" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Explorar cursos</Link></li>
              <li><Link to="/rutas" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Rutas de aprendizaje</Link></li>
              <li><Link to="/instituciones" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Instituciones</Link></li>
              <li><Link to="/novedades" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Novedades</Link></li>
              <li><Link to="/test" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Test vocacional</Link></li>
            </ul>
          </div>

          {/* Columna 3: ReducAR */}
          <div className="space-y-1 sm:space-y-4">
            <h4 className="text-white font-extrabold text-xl sm:text-sm mt-6 sm:mt-0 mb-3 sm:mb-0">ReducAR</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/como-funciona" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Cómo funciona</Link></li>
              <li><Link to="/nosotros" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Nosotros</Link></li>
              <li><Link to="/testimonios" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Testimonios</Link></li>
              <li><Link to="/ayuda" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Ayuda</Link></li>
              <li><Link to="/contacto" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="space-y-1 sm:space-y-4">
            <h4 className="text-white font-extrabold text-xl sm:text-sm mt-6 sm:mt-0 mb-3 sm:mb-0">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/politicas-privacidad" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Políticas de privacidad</Link></li>
              <li><Link to="/terminos-condiciones" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Términos y condiciones</Link></li>
              <li><Link to="/preguntas-frecuentes" className="inline-flex min-h-10 sm:min-h-9 items-center text-reducar-shell-text-secondary text-base sm:text-sm hover:text-reducar-turquoise transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* Columna 5: CTA organización */}
          <div className="lg:col-span-1 p-6 sm:p-5 rounded-2xl bg-reducar-shell-surface-soft border border-reducar-shell-border space-y-4 sm:space-y-3 mt-6 sm:mt-0">
            <h4 className="text-white font-extrabold text-xl sm:text-sm leading-snug">¿Representás a una organización?</h4>
            <p className="text-reducar-shell-text-secondary text-base sm:text-xs leading-relaxed">
              Sumate a ReducAR y hacé llegar tus oportunidades a más personas.
            </p>
            <Link to="/instituciones" className="flex min-h-12 sm:min-h-11 items-center justify-center text-center rounded-xl border border-reducar-primary text-reducar-primary text-base sm:text-xs font-extrabold hover:bg-reducar-primary hover:text-white transition-colors">
              Sumar mi organización
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-reducar-shell-text-secondary text-base sm:text-xs">
            © {new Date().getFullYear()} ReducAR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;