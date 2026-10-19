import { Link } from "react-router-dom";
import {
  InfoCard,
  SectionHeading,
  StaticPageLayout,
  primaryActionClass,
  secondaryActionClass,
} from "../components/common/StaticPageLayout";

const steps = [
  ["1", "Explorá", "Buscá cursos, becas y oportunidades por tema, modalidad o nivel."],
  ["2", "Compará", "Revisá la información clave y elegí la propuesta que mejor se adapta a vos."],
  ["3", "Avanzá", "Guardá tus opciones, seguí rutas de aprendizaje y conectate con instituciones."],
];

export default function ComoFuncionaPage() {
  return (
    <StaticPageLayout
      eyebrow="Cómo funciona"
      title="Tu próxima oportunidad, en tres pasos"
      description="ReducAR reúne información clara para que encontrar una propuesta de formación sea simple, accesible y seguro."
      actions={
        <>
          <Link to="/cursos" className={primaryActionClass}>Explorar cursos</Link>
          <Link to="/test" className={secondaryActionClass}>Hacer el test vocacional</Link>
        </>
      }
    >
      <SectionHeading title="Un recorrido simple" description="Podés empezar por una búsqueda directa o dejar que el test te ayude a descubrir intereses." />
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(([number, title, description]) => (
          <InfoCard key={number} icon={<span className="font-extrabold">{number}</span>} title={title}>
            <p>{description}</p>
          </InfoCard>
        ))}
      </div>
    </StaticPageLayout>
  );
}
