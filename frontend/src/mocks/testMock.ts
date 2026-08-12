export const testMock = {
  id: 1,
  nombre: "Test de orientación IT",
  descripcion:
    "Descubrí qué área de tecnología puede ser más adecuada para vos.",
  fecha_creacion: "2026-08-11",
};

export const categoriasMock = [
  {
    id: 1,
    nombre: "Desarrollo",
    descripcion:
      "Programación, desarrollo web y creación de aplicaciones y software.",
    icono_url: "",
  },
  {
    id: 2,
    nombre: "Diseño UX/UI",
    descripcion:
      "Diseño de interfaces y experiencias digitales centradas en las personas.",
    icono_url: "",
  },
  {
    id: 3,
    nombre: "Datos",
    descripcion:
      "Análisis de datos, bases de datos y búsqueda de información útil.",
    icono_url: "",
  },
  {
    id: 4,
    nombre: "Ciberseguridad",
    descripcion:
      "Seguridad informática, protección de sistemas y prevención de amenazas.",
    icono_url: "",
  },
];

export const preguntasMock = [
  {
    id: 1,
    test_id: 1,
    pregunta: "¿Qué proyecto te resultaría más interesante?",
    orden: 1,
  },
  {
    id: 2,
    test_id: 1,
    pregunta: "¿Qué tipo de problema te gustaría resolver?",
    orden: 2,
  },
  {
    id: 3,
    test_id: 1,
    pregunta: "¿Qué actividad te gustaría realizar en un equipo?",
    orden: 3,
  },
  {
    id: 4,
    test_id: 1,
    pregunta: "¿Qué tema te gustaría aprender?",
    orden: 4,
  },
  {
    id: 5,
    test_id: 1,
    pregunta: "¿Qué resultado te gustaría conseguir?",
    orden: 5,
  },
];

export const opcionesMock = [
  // Pregunta 1
  {
    id: 1,
    pregunta_id: 1,
    texto: "Crear una aplicación o página web",
    puntaje: 3,
    categoria_resultado_id: 1,
    orden: 1,
  },
  {
    id: 2,
    pregunta_id: 1,
    texto: "Diseñar cómo se ve y funciona una aplicación",
    puntaje: 3,
    categoria_resultado_id: 2,
    orden: 2,
  },
  {
    id: 3,
    pregunta_id: 1,
    texto: "Analizar información para encontrar patrones",
    puntaje: 3,
    categoria_resultado_id: 3,
    orden: 3,
  },
  {
    id: 4,
    pregunta_id: 1,
    texto: "Proteger una aplicación frente a amenazas",
    puntaje: 3,
    categoria_resultado_id: 4,
    orden: 4,
  },

  // Pregunta 2
  {
    id: 5,
    pregunta_id: 2,
    texto: "Encontrar por qué un programa no funciona",
    puntaje: 3,
    categoria_resultado_id: 1,
    orden: 1,
  },
  {
    id: 6,
    pregunta_id: 2,
    texto: "Conseguir que una aplicación sea fácil de usar",
    puntaje: 3,
    categoria_resultado_id: 2,
    orden: 2,
  },
  {
    id: 7,
    pregunta_id: 2,
    texto: "Encontrar información útil a partir de muchos datos",
    puntaje: 3,
    categoria_resultado_id: 3,
    orden: 3,
  },
  {
    id: 8,
    pregunta_id: 2,
    texto: "Detectar y prevenir posibles ataques",
    puntaje: 3,
    categoria_resultado_id: 4,
    orden: 4,
  },

  // Pregunta 3
  {
    id: 9,
    pregunta_id: 3,
    texto: "Escribir código y desarrollar funcionalidades",
    puntaje: 3,
    categoria_resultado_id: 1,
    orden: 1,
  },
  {
    id: 10,
    pregunta_id: 3,
    texto: "Pensar la interfaz y experiencia del usuario",
    puntaje: 3,
    categoria_resultado_id: 2,
    orden: 2,
  },
  {
    id: 11,
    pregunta_id: 3,
    texto: "Organizar y analizar información",
    puntaje: 3,
    categoria_resultado_id: 3,
    orden: 3,
  },
  {
    id: 12,
    pregunta_id: 3,
    texto: "Revisar la seguridad de sistemas y aplicaciones",
    puntaje: 3,
    categoria_resultado_id: 4,
    orden: 4,
  },

  // Pregunta 4
  {
    id: 13,
    pregunta_id: 4,
    texto: "Lenguajes de programación y desarrollo web",
    puntaje: 3,
    categoria_resultado_id: 1,
    orden: 1,
  },
  {
    id: 14,
    pregunta_id: 4,
    texto: "Diseño de interfaces y experiencia de usuario",
    puntaje: 3,
    categoria_resultado_id: 2,
    orden: 2,
  },
  {
    id: 15,
    pregunta_id: 4,
    texto: "Bases de datos y análisis de información",
    puntaje: 3,
    categoria_resultado_id: 3,
    orden: 3,
  },
  {
    id: 16,
    pregunta_id: 4,
    texto: "Seguridad informática y redes",
    puntaje: 3,
    categoria_resultado_id: 4,
    orden: 4,
  },

  // Pregunta 5
  {
    id: 17,
    pregunta_id: 5,
    texto: "Construir una solución tecnológica que funcione",
    puntaje: 3,
    categoria_resultado_id: 1,
    orden: 1,
  },
  {
    id: 18,
    pregunta_id: 5,
    texto: "Crear una experiencia digital clara y atractiva",
    puntaje: 3,
    categoria_resultado_id: 2,
    orden: 2,
  },
  {
    id: 19,
    pregunta_id: 5,
    texto: "Obtener información útil para tomar decisiones",
    puntaje: 3,
    categoria_resultado_id: 3,
    orden: 3,
  },
  {
    id: 20,
    pregunta_id: 5,
    texto: "Mantener sistemas y datos protegidos",
    puntaje: 3,
    categoria_resultado_id: 4,
    orden: 4,
  },
];

export const rutasMock = [
  {
    id: 1,
    titulo: "Ruta de Desarrollo Web",
    descripcion:
      "Aprendé los fundamentos necesarios para crear sitios y aplicaciones web.",
    imagen_url: "",
    nivel_id: 1,
    categoria_id: 1,
    esta_activa: true,
  },
  {
    id: 2,
    titulo: "Ruta de Diseño UX/UI",
    descripcion:
      "Aprendé a diseñar interfaces y experiencias digitales centradas en los usuarios.",
    imagen_url: "",
    nivel_id: 1,
    categoria_id: 2,
    esta_activa: true,
  },
  {
    id: 3,
    titulo: "Ruta de Análisis de Datos",
    descripcion:
      "Aprendé a trabajar con datos, analizarlos y obtener información útil.",
    imagen_url: "",
    nivel_id: 1,
    categoria_id: 3,
    esta_activa: true,
  },
  {
    id: 4,
    titulo: "Ruta de Ciberseguridad",
    descripcion:
      "Conocé los fundamentos de la seguridad informática y la protección de sistemas.",
    imagen_url: "",
    nivel_id: 1,
    categoria_id: 4,
    esta_activa: true,
  },
];