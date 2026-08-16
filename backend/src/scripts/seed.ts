// backend/src/scripts/seed.ts
import { supabase } from '../config/supabase.js'; // Ajusta la extensión según tu proyecto

/**
 * Datos de prueba para la tabla "cursos"
 */
const cursosSeed = [
  {
    titulo: 'Introducción a React',
    descripcion_corta: 'Aprende los fundamentos de React desde cero',
    descripcion_larga:
      'Curso completo de React para principiantes que cubre componentes, estado, props, hooks y enrutamiento básico. Proyectos prácticos incluidos.',
    fecha_inicio: '2026-09-01',
    fecha_termino: '2026-10-15',
    fecha_max_inscripcion: '2026-08-25',
    enlace_inscripcion: 'https://cursos-ejemplo.com/react-intro',
    cupos_disponibles: 25,
    esta_activo: true,
  },
  {
    titulo: 'Python para Data Science',
    descripcion_corta: 'Domina Python y sus librerías para análisis de datos',
    descripcion_larga:
      'Este curso te enseña Python desde cero, enfocado en las librerías más usadas en Data Science: Pandas, NumPy, Matplotlib y Scikit-learn. Incluye proyectos reales.',
    fecha_inicio: '2026-09-10',
    fecha_termino: '2026-11-20',
    fecha_max_inscripcion: '2026-09-05',
    enlace_inscripcion: 'https://cursos-ejemplo.com/python-data',
    cupos_disponibles: 15,
    esta_activo: true,
  },
  {
    titulo: 'Diseño UX/UI para no diseñadores',
    descripcion_corta: 'Principios de diseño de interfaces centrado en el usuario',
    descripcion_larga:
      'Curso práctico que te enseña a diseñar interfaces atractivas y funcionales, sin necesidad de ser diseñador. Cubre wireframes, prototipos, pruebas de usabilidad y herramientas como Figma.',
    fecha_inicio: '2026-10-01',
    fecha_termino: '2026-11-30',
    fecha_max_inscripcion: '2026-09-20',
    enlace_inscripcion: 'https://cursos-ejemplo.com/ux-ui',
    cupos_disponibles: 30,
    esta_activo: true,
  },
  {
    titulo: 'SQL avanzado con PostgreSQL',
    descripcion_corta: 'Optimiza tus consultas y domina bases de datos relacionales',
    descripcion_larga:
      'Curso avanzado de SQL enfocado en PostgreSQL. Aprende a escribir consultas complejas, optimizar índices, usar funciones avanzadas y gestionar grandes volúmenes de datos.',
    fecha_inicio: '2026-11-01',
    fecha_termino: '2026-12-15',
    fecha_max_inscripcion: '2026-10-25',
    enlace_inscripcion: 'https://cursos-ejemplo.com/sql-avanzado',
    cupos_disponibles: 10,
    esta_activo: true,
  },
  {
    titulo: 'Desarrollo Fullstack con Next.js',
    descripcion_corta: 'Construye aplicaciones completas con Next.js y TypeScript',
    descripcion_larga:
      'Curso intensivo que cubre el desarrollo de aplicaciones fullstack usando Next.js App Router, autenticación, conexión a bases de datos y despliegue en Vercel.',
    fecha_inicio: '2026-12-01',
    fecha_termino: '2027-01-31',
    fecha_max_inscripcion: '2026-11-20',
    enlace_inscripcion: 'https://cursos-ejemplo.com/nextjs-fullstack',
    cupos_disponibles: 20,
    esta_activo: true,
  },
  {
    titulo: 'Marketing Digital para Emprendedores',
    descripcion_corta: 'Aprende las bases del marketing digital para hacer crecer tu negocio',
    descripcion_larga:
      'Curso introductorio que cubre SEO, SEM, redes sociales, email marketing y estrategia de contenidos. Casos prácticos y ejemplos reales incluidos.',
    fecha_inicio: '2026-09-15',
    fecha_termino: '2026-10-30',
    fecha_max_inscripcion: '2026-09-10',
    enlace_inscripcion: 'https://cursos-ejemplo.com/marketing-digital',
    cupos_disponibles: 40,
    esta_activo: true,
  },
];

/**
 * Función principal para ejecutar el seed
 */
async function runSeed() {
  console.log('🚀 Iniciando seed de la tabla cursos...');

  try {
    // 1. Limpiar la tabla (opcional: eliminar datos existentes)
    console.log('🧹 Eliminando cursos existentes...');
    const { error: deleteError } = await supabase.from('cursos').delete().neq('id', 0);
    if (deleteError) {
      console.error('❌ Error al limpiar la tabla:', deleteError.message);
      process.exit(1);
    }

    // 2. Insertar los nuevos cursos
    console.log('📥 Insertando cursos de prueba...');
    const { data, error: insertError } = await supabase
      .from('cursos')
      .insert(cursosSeed)
      .select();

    if (insertError) {
      console.error('❌ Error al insertar cursos:', insertError.message);
      process.exit(1);
    }

    // 3. Mostrar resumen
    console.log(`✅ Seed completado exitosamente. ${data?.length || 0} cursos insertados.`);
    console.log('📋 IDs de los cursos insertados:');
    data?.forEach((curso) => {
      console.log(`   - ID ${curso.id}: ${curso.titulo}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    process.exit(1);
  }
}

// Ejecutar el seed
runSeed();