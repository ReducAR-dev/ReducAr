export type PromotedCourse = {
  id: string;
  badge: "DESTACADO" | "BECA DISPONIBLE" | "NUEVO" | "CUPOS LIMITADOS" | "100% GRATIS";
  title: string;
  institution: string;
  modality: string;
  duration: string;
  benefit: string;
  image: string;
  imageAlt: string;
  cta: {
    label: string;
    href?: string;
    slug?: string;
  };
};

// Las imágenes se mantienen como strings para poder reemplazar cada URL remota
// por un import de src/assets sin cambiar la lógica del carrusel.
export const promotedCoursesMock: readonly PromotedCourse[] = [
  {
    id: "full-stack-pescar",
    badge: "DESTACADO",
    title: "Desarrollo Web Full Stack",
    institution: "Fundación Pescar",
    modality: "Virtual",
    duration: "16 semanas",
    benefit: "100% gratuito",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Persona desarrollando una aplicación web en su computadora",
    cta: {
      label: "Ver oportunidad",
      slug: "desarrollo-web-full-stack",
    },
  },
  {
    id: "data-analytics-power-bi",
    badge: "BECA DISPONIBLE",
    title: "Data Analytics con Power BI",
    institution: "Impulso Digital",
    modality: "Virtual",
    duration: "10 semanas",
    benefit: "Beca disponible",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Panel digital con gráficos y visualizaciones de datos",
    cta: {
      label: "Ver oportunidad",
      slug: "data-analytics-power-bi",
    },
  },
  {
    id: "introduccion-inteligencia-artificial",
    badge: "NUEVO",
    title: "Introducción a Inteligencia Artificial",
    institution: "Laboratorio Futuro",
    modality: "Híbrida",
    duration: "6 semanas",
    benefit: "Curso gratuito",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Composición tecnológica que representa inteligencia artificial",
    cta: {
      label: "Ver oportunidad",
      slug: "introduccion-inteligencia-artificial",
    },
  },
];
