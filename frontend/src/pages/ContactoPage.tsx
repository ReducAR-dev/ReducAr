import { Link } from "react-router-dom";
import {
  InfoCard,
  StaticPageLayout,
  primaryActionClass,
  secondaryActionClass,
} from "../components/common/StaticPageLayout";

export default function ContactoPage() {
  const openChat = (): void => {
    document.querySelector<HTMLButtonElement>(".chatbot-launcher")?.click();
  };

  return (
    <StaticPageLayout
      eyebrow="Contacto"
      title="Estamos para orientarte"
      description="Contanos qué necesitás y te ayudaremos a encontrar el recurso o canal adecuado."
      actions={
        <>
          <button type="button" onClick={openChat} className={primaryActionClass}>Hablar con RedBot</button>
          <Link to="/ayuda" className={secondaryActionClass}>Visitar ayuda</Link>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard icon="🤖" title="Consultas rápidas">
          RedBot está disponible en todo el sitio para responder preguntas generales sobre ReducAR.
        </InfoCard>
        <InfoCard icon="🏫" title="Instituciones">
          Si representás a una organización, conocé cómo compartir oportunidades con la comunidad.
          <Link to="/instituciones" className="mt-4 block font-bold text-reducar-primary hover:underline">Ver instituciones →</Link>
        </InfoCard>
        <InfoCard icon="❓" title="Dudas frecuentes">
          Revisá respuestas sobre cuentas, cursos, rutas, inscripciones y uso de la plataforma.
          <Link to="/preguntas-frecuentes" className="mt-4 block font-bold text-reducar-primary hover:underline">Consultar respuestas →</Link>
        </InfoCard>
      </div>
    </StaticPageLayout>
  );
}
