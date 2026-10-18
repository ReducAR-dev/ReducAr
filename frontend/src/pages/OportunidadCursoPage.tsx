// src/pages/OportunidadCursoPage.tsx
import { useState } from "react";

interface CursoDescuento {
  id: number;
  titulo: string;
  institucion: string;
  precioOriginal: number;
  precioDescuento: number;
  descuento: number;
  imagen: string;
}

const CURSOS_DESCUENTO: CursoDescuento[] = [
  { id: 1, titulo: "Bootcamp Data Science", institucion: "DataAcademy", precioOriginal: 100000, precioDescuento: 50000, descuento: 50, imagen: "📊" },
  { id: 2, titulo: "Diseño Gráfico Profesional", institucion: "CreativeSchool", precioOriginal: 80000, precioDescuento: 60000, descuento: 25, imagen: "🎨" },
  { id: 3, titulo: "Inglés Técnico para IT", institucion: "LanguageCenter", precioOriginal: 40000, precioDescuento: 30000, descuento: 25, imagen: "🇬🇧" },
];

export default function OportunidadCursoPage() {
  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-reducar-primary/20 px-4 py-1.5 text-sm font-bold text-reducar-primary">
            OFERTAS ESPECIALES
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-reducar-shell-text">
            Cursos en Descuento
          </h1>
          <p className="mt-3 text-reducar-shell-text-secondary text-lg">
            Aprovecha estas oportunidades únicas para potenciar tu futuro.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {CURSOS_DESCUENTO.map((curso) => (
            <div key={curso.id} className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl flex flex-col">
              <div className="text-5xl mb-4">{curso.imagen}</div>
              <h3 className="text-xl font-bold text-reducar-shell-text mb-2">{curso.titulo}</h3>
              <p className="text-sm text-reducar-shell-text-secondary mb-4">{curso.institucion}</p>

              <div className="mt-auto">
                <div className="text-2xl font-extrabold text-reducar-primary">
                  ${curso.precioDescuento.toLocaleString("es-AR")}
                </div>
                <div className="text-sm text-reducar-shell-text-secondary line-through">
                  ${curso.precioOriginal.toLocaleString("es-AR")}
                </div>
                <div className="inline-block mt-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  -{curso.descuento}% OFF
                </div>
                <button className="w-full mt-4 rounded-xl bg-reducar-primary py-2.5 text-sm font-bold text-white transition hover:bg-reducar-primary-dark">
                  Inscribirse ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
