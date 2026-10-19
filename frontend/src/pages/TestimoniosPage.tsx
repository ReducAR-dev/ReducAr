import { Link } from "react-router-dom";
import {
  InfoCard,
  StaticPageLayout,
  primaryActionClass,
} from "../components/common/StaticPageLayout";

const testimonials = [
  ["Micaela", "Estudiante", "Encontré una ruta clara para empezar en tecnología y pude comparar alternativas sin perderme."],
  ["Lucas", "En búsqueda de empleo", "Los filtros me ayudaron a ubicar cursos compatibles con mis horarios y objetivos."],
  ["Camila", "Referente de una organización", "ReducAR hace más simple acercar oportunidades de formación a quienes las necesitan."],
];

export default function TestimoniosPage() {
  return (
    <StaticPageLayout
      eyebrow="Comunidad"
      title="Experiencias que inspiran"
      description="Personas e instituciones encuentran en ReducAR una forma más simple de conectar con oportunidades."
      actions={<Link to="/cursos" className={primaryActionClass}>Explorar oportunidades</Link>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map(([name, role, quote]) => (
          <InfoCard key={name} icon="“" title={name}>
            <p className="font-semibold text-reducar-primary">{role}</p>
            <p className="mt-3">{quote}</p>
          </InfoCard>
        ))}
      </div>
    </StaticPageLayout>
  );
}
