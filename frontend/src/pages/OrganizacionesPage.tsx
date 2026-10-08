// src/pages/OrganizacionesPage.tsx
import PromoBar from "../components/features/PromoBar";
import OrganizacionCard from "../components/features/OrganizacionCard";
import { organizacionesMock } from "../mocks/organizaciones";

function OrganizacionesPage() {
  return (
    <div className="min-h-screen w-full bg-reducar-bg text-reducar-text">
      <PromoBar />

      <main>
        <section className="py-7 pb-9">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-5 text-xs font-semibold text-reducar-text-secondary">
              <span>Inicio</span><span>›</span>
              <strong className="text-reducar-primary">Instituciones</strong>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
              <span className="inline-flex items-center justify-center mb-4 px-4 py-2 text-[10px] font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/35 rounded-full">
                ✦ Nuestra comunidad
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight leading-tight max-w-2xl">
                Instituciones que impulsan
                <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> tu futuro</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-reducar-text-secondary leading-relaxed">
                Conocé organizaciones que ofrecen oportunidades de formación, tecnología y desarrollo profesional para acompañarte en tu crecimiento.
              </p>
            </div>
          </div>
        </section>

        <section className="py-3 pb-14">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {organizacionesMock.map((org) => (
                <OrganizacionCard
                  key={org.nombre}
                  nombre={org.nombre}
                  logo={org.logo}
                  descripcion={org.descripcion}
                  categoria={org.categoria}
                  cursos={org.cursos}
                  link={org.link}
                  destacada={org.destacada}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="p-6 md:p-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-5 border border-reducar-primary/30 rounded-2xl bg-gradient-to-r from-reducar-primary/10 to-reducar-turquoise/5">
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-gradient-to-br from-reducar-primary to-reducar-turquoise-dark text-white text-lg">✦</div>
              <div>
                <span className="text-[8px] font-black tracking-widest text-reducar-primary">¿SOS PARTE DE UNA INSTITUCIÓN?</span>
                <h2 className="mt-1.5 text-lg font-extrabold text-reducar-text">Sumate a la comunidad ReducAR</h2>
                <p className="mt-1 max-w-2xl text-[10px] text-reducar-text-secondary leading-relaxed">
                  Compartí tus oportunidades de formación y conectá con personas que buscan seguir aprendiendo.
                </p>
              </div>
                    <a
  href="https://forms.gle/KKiQ9ru67bkdqEwR7"
  target="_blank"
  rel="noopener noreferrer"
   className="inline-flex items-center gap-2 rounded-lg bg-[#4e0db8] px-5 py-3 font-medium text-white transition hover:bg-[#3d0a91]"
>
  Conocer más
  <span>→</span>
</a>  
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizacionesPage; 