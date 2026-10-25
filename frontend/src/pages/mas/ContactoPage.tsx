import { useState } from "react";
import { Link } from "react-router-dom";
import chatbotLogo from "../../assets/logo-chatbot.png"; // Ajustá la ruta si es necesario

// URLs oficiales de las redes
const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
  { name: "GitHub", url: "https://github.com/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg> },
  { name: "Gmail", url: "https://mail.google.com/", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
  { name: "LinkedIn", url: "https://www.linkedin.com/", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
];

export default function ContactoPage() {
  const openChat = () => document.querySelector<HTMLButtonElement>(".chatbot-launcher")?.click();

  // Estados para el formulario
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Creamos el enlace mailto con los datos del formulario
    const subject = encodeURIComponent(`Contacto ReducAR - ${formData.nombre}`);
    const body = encodeURIComponent(`Hola equipo de ReducAR,\n\nMi nombre es ${formData.nombre} (${formData.email}).\n\nMi consulta es:\n${formData.mensaje}`);
    window.location.href = `mailto:reducar.dev@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative min-h-screen bg-reducar-bg text-reducar-text pb-24 overflow-hidden">

      {/* FONDO DE AURORA (Luces difuminadas únicas) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-150 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-100 h-100 bg-reducar-primary/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-10 right-20 w-75 h-75 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-40 left-1/3 w-62.5 h-62.5 bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* 1. BREADCRUMB */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
          <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
          <span>›</span>
          <strong className="text-reducar-primary">Contacto</strong>
        </div>
      </div>

      {/* 2. HEADER Y FORMULARIO */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Hablemos</h1>
          <p className="mt-4 text-lg text-reducar-text-secondary">
            ¿Tenés una duda, propuesta o problema? Escribinos directamente y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* Formulario de Contacto (Izquierda - Ocupa 3 columnas) */}
          <div className="md:col-span-3 bg-reducar-surface border border-reducar-border rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Enviar un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-bold text-reducar-text mb-1.5">Nombre</label>
                  <input
                    id="nombre" required
                    value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full rounded-xl border border-reducar-border bg-reducar-bg px-4 py-3 text-sm text-reducar-text outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-reducar-text mb-1.5">Tu correo</label>
                  <input
                    id="email" type="email" required
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-reducar-border bg-reducar-bg px-4 py-3 text-sm text-reducar-text outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-bold text-reducar-text mb-1.5">¿En qué podemos ayudarte?</label>
                <textarea
                  id="mensaje" required rows={4}
                  value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full rounded-xl border border-reducar-border bg-reducar-bg px-4 py-3 text-sm text-reducar-text outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all resize-none"
                  placeholder="Describí tu consulta o problema..."
                />
              </div>
              <button type="submit" className="w-full rounded-xl bg-reducar-primary px-6 py-4 font-extrabold text-white shadow-lg shadow-reducar-primary/20 hover:bg-reducar-primary-dark hover:-translate-y-0.5 transition-all">
                Enviar a reducar.dev@gmail.com
              </button>
            </form>
          </div>

          {/* Canales Alternativos (Derecha - Ocupa 2 columnas) */}
          <div className="md:col-span-2 space-y-6">

            {/* RedBot Card Sutil */}
            <div className="bg-reducar-surface border border-reducar-border rounded-3xl p-6 shadow-sm flex items-center gap-5 group hover:border-reducar-primary/40 transition-colors">
              <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-reducar-primary/20 shadow-inner group-hover:scale-105 transition-transform">
                <img src={chatbotLogo} alt="RedBot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-reducar-text">¿Consultas rápidas?</h3>
                <p className="text-xs text-reducar-text-secondary mt-1 mb-2">RedBot está en línea 24/7.</p>
                <button onClick={openChat} className="text-sm font-bold text-reducar-primary hover:underline">Hablar con RedBot →</button>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-reducar-surface border border-reducar-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-reducar-text mb-4">Nuestras redes</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-reducar-border bg-reducar-bg text-reducar-text-secondary hover:text-reducar-primary hover:border-reducar-primary/30 transition-all hover:-translate-y-0.5"
                  >
                    {social.icon}
                    <span className="text-sm font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Correo Directo */}
            <div className="bg-reducar-surface border border-reducar-border rounded-3xl p-6 shadow-sm text-center">
              <p className="text-sm text-reducar-text-secondary mb-1">Escribinos directamente a:</p>
              <a href="mailto:reducar.dev@gmail.com" className="font-extrabold text-reducar-primary text-lg hover:underline break-all">
                reducar.dev@gmail.com
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INSTITUCIONES Y SOPORTE (Info detallada, rediseñada) */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Tarjeta Instituciones */}
          <div className="relative overflow-hidden rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
            {/* Fondo decorativo que se ilumina */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                {/* Ícono SVG de Edificio/Institución */}
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3 text-reducar-text">Para Instituciones</h3>
              <p className="text-reducar-text-secondary leading-relaxed text-sm">
                Si representás a una organización, fundación o academia y querés publicar cursos, becas o talleres en ReducAR, escribinos con el asunto <strong className="text-reducar-text font-semibold">"Alta de Institución"</strong>.
                Nuestro equipo evaluará el contenido y se pondrá en contacto para verificar la información.
              </p>
            </div>
          </div>

          {/* Tarjeta Soporte Técnico */}
          <div className="relative overflow-hidden rounded-3xl border border-reducar-border bg-reducar-surface p-8 shadow-sm hover:shadow-xl hover:border-reducar-primary/30 transition-all duration-300 group">
            {/* Fondo decorativo que se ilumina */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-reducar-primary/5 rounded-full blur-2xl group-hover:bg-reducar-primary/10 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-reducar-primary/10 text-reducar-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-reducar-primary group-hover:text-white transition-all duration-300 shadow-sm">
                {/* Ícono SVG de Soporte/Salvavidas */}
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3 text-reducar-text">Soporte Técnico</h3>
              <p className="text-reducar-text-secondary leading-relaxed text-sm">
                ¿Tuviste un error al registrarte, no podés iniciar sesión o una página no carga correctamente?
                Usá el formulario de la izquierda detallando tu correo de cuenta y el error exacto que viste.
                Nuestro equipo lo revisará para darte una solución.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}