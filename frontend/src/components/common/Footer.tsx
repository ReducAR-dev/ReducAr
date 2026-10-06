// src/components/common/Footer.tsx
import { Link } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";

export const Footer = () => {
  return (
    <footer className="relative bg-[#0b1024] text-[#e6e8f2] overflow-hidden">
      {/* Decoración de red (opcional, puedes mantener los SVG) */}
      <svg className="absolute left-0 top-0 bottom-0 w-[300px] pointer-events-none opacity-90 hidden lg:block" viewBox="0 0 300 400" aria-hidden="true">
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

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Columna 1: Marca */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2" aria-label="Ir al inicio">
              <img src={logoReducar} alt="" className="h-10 w-auto" aria-hidden="true" />
              <span className="text-2xl font-extrabold text-white">
                Reduc<span className="text-[#3fd9c9]">AR</span>
              </span>
            </Link>
            <p className="text-[#e6e8f2] font-bold text-sm">Tu red de oportunidades</p>
            <p className="text-[#9aa3c0] text-sm leading-relaxed">
              Conectamos personas con organizaciones que ofrecen oportunidades
              de formación gratuita para impulsar el aprendizaje y el
              desarrollo profesional.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/30 text-[#e6e8f2] hover:border-[#3fd9c9] hover:text-[#3fd9c9] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/30 text-[#e6e8f2] hover:border-[#3fd9c9] hover:text-[#3fd9c9] transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/30 text-[#e6e8f2] hover:border-[#3fd9c9] hover:text-[#3fd9c9] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><path d="M14 8h1.5M14 8a2 2 0 0 0-2 2v9M10 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm">Explorar</h4>
            <ul className="space-y-3">
              <li><Link to="/cursos" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Todas las oportunidades</Link></li>
              <li><Link to="/cursos" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Categorías</Link></li>
              <li><Link to="/instituciones" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Organizaciones</Link></li>
            </ul>
          </div>

          {/* Columna 3: ReducAR */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm">ReducAR</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Quiénes somos</Link></li>
              <li><Link to="/novedades" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Novedades</Link></li>
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Ayuda</Link></li>
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Contacto</Link></li>
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Política de privacidad</Link></li>
              <li><Link to="/" className="text-[#9aa3c0] text-sm hover:text-[#3fd9c9] transition-colors">Términos y condiciones</Link></li>
            </ul>
          </div>

          {/* Columna 5: CTA */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-[#0f1730] border border-white/10 space-y-3">
            <h4 className="text-white font-extrabold text-sm leading-snug">¿Representás a una organización?</h4>
            <p className="text-[#9aa3c0] text-xs leading-relaxed">
              Sumate a ReducAR y hacé llegar tus oportunidades a más personas.
            </p>
            <Link to="/instituciones" className="block text-center h-10 leading-10 rounded-xl border border-[#7b6cf6] text-[#b8b0ff] text-xs font-extrabold hover:bg-[#7b6cf6] hover:text-white transition-colors">
              Sumar mi organización
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-[#9aa3c0] text-xs">
            © {new Date().getFullYear()} ReducAR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;