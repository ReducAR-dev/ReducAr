// src/pages/Registropage.tsx
import { useState } from "react";
import PromoBar from "../components/features/PromoBar";

type PanelKey = "usuario" | "institucion";

export default function RegistroPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>("usuario");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <section className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            Sumate a <span className="text-reducar-primary">ReducAR</span>
          </h1>
          <p className="text-base text-reducar-text-secondary leading-relaxed">
            Elegí cómo querés participar: buscando tu próxima oportunidad de aprendizaje, o compartiendo formación gratuita como organización.
          </p>
        </section>

        <div className="hidden md:block" />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel Usuario */}
          <form onSubmit={handleSubmit} className="p-10 flex flex-col bg-reducar-surface rounded-3xl shadow-2xl border border-reducar-border">
            <div className="w-12 h-12 grid place-items-center rounded-2xl bg-reducar-primary-light mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#7b6cf6" strokeWidth="1.8"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="#7b6cf6" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <div className="text-sm font-bold tracking-wider uppercase text-reducar-primary mb-2">Para personas</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Registrate como usuario</h2>
            <p className="text-sm text-reducar-text-secondary leading-relaxed mb-6">
              Explorá cursos, guardá tus favoritos y postulate a programas de formación gratuita.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="mb-1">
                <label htmlFor="uNombre" className="block mb-1.5 text-sm font-bold text-white">Nombre</label>
                <input id="uNombre" type="text" placeholder="Tu nombre" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
              </div>
              <div className="mb-1">
                <label htmlFor="uApellido" className="block mb-1.5 text-sm font-bold text-white">Apellido</label>
                <input id="uApellido" type="text" placeholder="Tu apellido" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="uFechaNacimiento" className="block mb-1.5 text-sm font-bold text-white">Fecha de nacimiento</label>
              <input id="uFechaNacimiento" type="date" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="uEmail" className="block mb-1.5 text-sm font-bold text-white">Correo electrónico</label>
              <input id="uEmail" type="email" placeholder="tu@email.com" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="uPass" className="block mb-1.5 text-sm font-bold text-white">Contraseña</label>
              <input id="uPass" type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>

            <button type="submit" className="mt-6 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors">
              Crear mi cuenta
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <p className="mt-4 text-xs text-center text-reducar-text-secondary">Es gratis y te lleva menos de un minuto.</p>
          </form>

          {/* Panel Institución */}
          <form onSubmit={handleSubmit} className="p-10 flex flex-col bg-linear-to-b from-reducar-surface-soft to-reducar-primary-light rounded-3xl shadow-2xl border border-reducar-border">
            <div className="w-12 h-12 grid place-items-center rounded-2xl bg-reducar-primary mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 21V9l8-5 8 5v12" stroke="white" strokeWidth="1.8"/><path d="M9 21v-6h6v6" stroke="white" strokeWidth="1.8"/></svg>
            </div>
            <div className="text-sm font-bold tracking-wider uppercase text-reducar-primary mb-2">Para organizaciones</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Registrá tu institución</h2>
            <p className="text-sm text-reducar-text-secondary leading-relaxed mb-6">
              Publicá tus cursos y programas, y llegá a miles de personas buscando formarse.
            </p>

            <div className="mb-4">
              <label htmlFor="iNombre" className="block mb-1.5 text-sm font-bold text-white">Nombre de la organización</label>
              <input id="iNombre" type="text" placeholder="Ej: Fundación Pescar" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="iWeb" className="block mb-1.5 text-sm font-bold text-white">Sitio web de la organización</label>
              <input id="iWeb" type="url" placeholder="www.sitioweb.org" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="iEmail" className="block mb-1.5 text-sm font-bold text-white">Correo institucional</label>
              <input id="iEmail" type="email" placeholder="contacto@organizacion.org" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="iPass" className="block mb-1.5 text-sm font-bold text-white">Contraseña</label>
              <input id="iPass" type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white outline-none focus:border-reducar-primary transition-all" />
            </div>

            <button type="submit" className="mt-6 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-reducar-bg font-bold hover:bg-gray-100 transition-colors">
              Registrar organización
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <p className="mt-4 text-xs text-center text-reducar-text-secondary">Tu solicitud será revisada por el equipo de ReducAR.</p>
          </form>
        </div>
      </div>
    </div>
  );
}