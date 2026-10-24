import { InfoCard, StaticPageLayout } from "../layouts/StaticPageLayout";

export default function PoliticasPrivacidadPage() {
  return (
    <StaticPageLayout
      eyebrow="Legal"
      title="Políticas de privacidad"
      description="Nuestro compromiso es usar la información de forma responsable, transparente y limitada a la prestación del servicio."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <InfoCard title="Información que utilizamos">Datos de cuenta, preferencias y actividad necesaria para brindar las funciones de la plataforma.</InfoCard>
        <InfoCard title="Para qué la utilizamos">Para autenticar usuarios, personalizar la experiencia, mejorar el servicio y responder solicitudes.</InfoCard>
        <InfoCard title="Protección y acceso">Aplicamos controles técnicos y organizativos. Nunca compartas contraseñas ni códigos de acceso.</InfoCard>
        <InfoCard title="Tus opciones">Podés revisar y actualizar los datos de tu perfil desde tu cuenta y solicitar asistencia ante cualquier duda.</InfoCard>
      </div>
      <p className="mt-8 text-sm text-reducar-text-secondary">Última actualización: octubre de 2026.</p>
    </StaticPageLayout>
  );
}
