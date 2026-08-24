
import { Curso  } from '../types/curso.types';

// --- MOCK ---
const cursosMock: Curso[] = [
  {
    id: 1,
    titulo: "Introducción a TypeScript",
    descripcion_corta: "Aprende los conceptos básicos de TypeScript",
    descripcion_larga: "Este curso te introduce en los conceptos fundamentales de TypeScript, incluyendo tipos, interfaces y clases.",
    fecha_inicio: new Date("2023-10-01"),
    fecha_termino: new Date("2023-12-01"),
    fecha_max_inscripcion: new Date("2023-09-15"),
    fecha_publicacion: 1696156800,  //CAMBIAR Timestamp
    enlace_inscripcion: "https://share.google/PbakIQmhooN3gABbD",
    cupos_disponibles: 20,
    esta_activo: true
  },
  {
    id: 2,
    titulo: "Desarrollo Web con React",
    descripcion_corta: "Aprende a construir aplicaciones web con React",  
    descripcion_larga: "Este curso te enseña a crear aplicaciones web modernas utilizando React, incluyendo componentes, estado y enrutamiento.",
    fecha_inicio: new Date("2023-11-01"),
    fecha_termino: new Date("2024-01-15"),  
    fecha_max_inscripcion: new Date("2023-10-20"),
    fecha_publicacion: 1696156800,  //CAMBIAR Timestamp
    enlace_inscripcion: "https://i0.wp.com/puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg?resize=768%2C511&ssl=1",
    cupos_disponibles: 15,
    esta_activo: true
  }

]


// --- FUNCIÓN  A REEMPLAZAR ---
export const obtenerTodosLosCursos = async (): Promise<Curso[]> => {
  // TODO: reemplazar con llamada real a la base de datos
  // mientras tanto, devolvemos mock
  return cursosMock;
};

export const obtenerCursoPorId = async (id: number): Promise<Curso | null> => {
    // TODO: reemplazar con llamada real
    // mientras tanto, devolvemos mock      
    const curso = cursosMock.find(curso => curso.id === id);
    return curso || null;   
};


//Obtener todos los cursos (GET)
//Obtener curso por id (GET)
//Actualizar curso (POST)
//Borrar curso (DELETE)
