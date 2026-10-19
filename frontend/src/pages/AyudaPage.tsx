import { Link } from "react-router-dom";
import {
  InfoCard,
  StaticPageLayout,
  primaryActionClass,
} from "../components/common/StaticPageLayout";

export default function AyudaPage() {
  return (
    <StaticPageLayout
      eyebrow="Centro de ayuda"
      title="¿Cómo podemos ayudarte?"
      description="Encontrá respuestas rápidas y elegí el canal que mejor se adapte a tu consulta."
      actions={<Link to="/preguntas-frecuentes" className={primaryActionClass}>Ver preguntas frecuentes</Link>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard icon="🧭" title="Primeros pasos">
          <p>Conocé cómo buscar cursos, explorar rutas y aprovechar todas las herramientas de ReducAR.</p>
          <Link to="/como-funciona" className="mt-4 inline-flex font-bold text-reducar-primary hover:underline">Ver cómo funciona →</Link>
        </InfoCard>
        <InfoCard icon="💬" title="Consultá a RedBot">
          <p>Usá el asistente disponible en la esquina inferior para resolver dudas sobre la plataforma.</p>
          <button
            type="button"
            onClick={() => document.querySelector<HTMLButtonElement>(".chatbot-launcher")?.click()}
            className="mt-4 font-bold text-reducar-primary hover:underline"
          >
            Abrir RedBot →
          </button>
        </InfoCard>
        <InfoCard icon="✉️" title="Necesito más ayuda">
          <p>Si tu consulta requiere atención personal, encontrá las alternativas de contacto disponibles.</p>
          <Link to="/contacto" className="mt-4 inline-flex font-bold text-reducar-primary hover:underline">Ir a contacto →</Link>
        </InfoCard>
      </div>
    </StaticPageLayout>
  );
}
