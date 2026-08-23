
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
    enlace_inscripcion: "https://example.com/inscripcion/1",
    cupos_disponibles: 20,
    esta_activo: true
  }
];



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
