import logoPescar from "../assets/fundacion-pescar.png.png";
import logoEmpujar from "../assets/fundacion-empujar.png.png";
import logoChicas from "../assets/chicas-tecnologia.jpg.jpg";
import logoForge from "../assets/fundacion-forge.webp.webp";

export type Organizacion = {
  nombre: string;
  logo: string;
  descripcion: string;
  categoria: string;
  cursos: number;
  destacada?: boolean;
  link: string;
};

export const organizacionesMock: Organizacion[] = [
  {
    nombre: "Fundación Pescar",
    logo: logoPescar,
    descripcion:
      "Forma a personas en situación de vulnerabilidad socioeconómica para favorecer su inserción laboral y la construcción de un proyecto de vida sostenible.",
    categoria: "Educación y empleabilidad",
    cursos: 1,
    destacada: true,
    link: "https://www.pescar.org.ar/",
  },
  {
    nombre: "Fundación Empujar",
    logo: logoEmpujar,
    descripcion:
      "Trabaja para mejorar la empleabilidad de jóvenes de 18 a 24 años y acompañarlos en el acceso a su primer empleo formal.",
    categoria: "Empleabilidad",
    cursos: 1,
    link: "https://fundacionempujar.org/",
  },
  {
    nombre: "Chicas en Tecnología",
    logo: logoChicas,
    descripcion:
      "Impulsa a jóvenes y mujeres a desarrollarse en tecnología y trabaja para reducir la brecha de género en el sector.",
    categoria: "Tecnología",
    cursos: 1,
    link: "https://chicasentecnologia.org/es_ar/",
  },
  {
    nombre: "Fundación Forge",
    logo: logoForge,
    descripcion:
      "Acompaña a jóvenes en su acceso al mundo laboral mediante formación gratuita y herramientas para mejorar sus oportunidades de empleo.",
    categoria: "Formación profesional",
    cursos: 1,
    link: "https://fforge.org/",
  },
];