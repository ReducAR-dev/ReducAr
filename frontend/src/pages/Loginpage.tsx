import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <section className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            Iniciá sesión en <span className="text-reducar-primary">ReducAR</span>
          </h1>
          <p className="text-base text-reducar-text-secondary leading-relaxed">
            Accedé a tu cuenta, ya seas una persona buscando oportunidades o una organización gestionando sus programas.
          </p>
        </section>

        <div className="max-w-2xl mx-auto p-4 bg-reducar-primary-light rounded-3xl shadow-2xl flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl p-10 bg-reducar-surface rounded-3xl shadow-2xl flex flex-col">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold text-white">Correo electrónico</label>
              <input id="email" type="email" placeholder="tu@email.com" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all" />
            </div>
            <div className="mb-4">
              <label htmlFor="pass" className="block mb-2 text-sm font-bold text-white">Contraseña</label>
              <input id="pass" type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-white placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all" />
            </div>

            <div className="flex items-center justify-between my-2 text-sm">
              <label className="flex items-center gap-2 text-reducar-text-secondary cursor-pointer">
                <input type="checkbox" className="accent-reducar-primary" />
                Recordarme
              </label>
              <a href="#" className="text-reducar-primary font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="mt-6 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark hover:-translate-y-0.5 transition-all">
              Iniciar sesión
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <p className="mt-4 text-xs text-reducar-text-secondary text-center">
              ¿No tenés cuenta?{" "}
              <button type="button" onClick={() => navigate("/registro")} className="text-reducar-primary font-semibold hover:underline">Registrate</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}