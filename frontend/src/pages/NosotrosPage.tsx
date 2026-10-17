export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#020b24] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-14 md:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          <div className="relative z-10">
            <span className="rounded-full bg-gradient-to-r from-violet-700 to-blue-600 px-4 py-2 text-sm font-bold">
              NOSOTROS
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Conocé
              <span className="block bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                ReducAR
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
              Somos un grupo de desarrolladores que creamos esta plataforma
              para conectar personas con oportunidades de formación y ayudar
              a construir un mejor futuro.
            </p>

            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
          </div>

          <div className="relative z-10">
            <img
              src="/foto-grupo.jpg"
              alt="Equipo ReducAR"
              className="w-full rounded-2xl border border-violet-500 object-cover shadow-2xl"
            />
          </div>

        </div>

        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-violet-700/20 blur-3xl" />
      </section>


      {/* QUÉ ES REDUCAR */}
      <section className="bg-[#061238] px-6 py-12 md:px-16">
        <div className="mx-auto max-w-6xl">

          <span className="rounded-full bg-violet-800 px-4 py-2 text-xs font-bold">
            ¿QUÉ ES REDUCAR?
          </span>

          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight">
            Más que una plataforma,
            <span className="block bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              una comunidad.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            ReducAR reúne cursos, instituciones y recursos educativos en un
            solo lugar, facilitando la búsqueda de oportunidades de formación
            y conectando a las personas con propuestas que se adaptan a sus
            intereses y objetivos.
          </p>

          {/* TARJETAS */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-violet-700 bg-[#07143a] p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-3xl shadow-lg">
                🎓
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Aprendé
              </h3>

              <p className="mt-2 leading-7 text-slate-300">
                Encontrá cursos y oportunidades de formación.
              </p>
            </div>


            <div className="rounded-2xl border border-blue-600 bg-[#07143a] p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-3xl shadow-lg">
                ➤
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Orientate
              </h3>

              <p className="mt-2 leading-7 text-slate-300">
                Descubrí opciones según tus intereses y objetivos.
              </p>
            </div>


            <div className="rounded-2xl border border-cyan-500 bg-[#07143a] p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-3xl shadow-lg">
                🚀
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Crece
              </h3>

              <p className="mt-2 leading-7 text-slate-300">
                Desarrollá nuevas habilidades para tu futuro profesional.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* MISIÓN */}
      <section className="px-6 py-10 md:px-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-cyan-400 bg-gradient-to-r from-[#1737a0] via-[#10266d] to-[#07143a] px-8 py-10">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div className="flex items-start gap-6">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-600 text-3xl">
                🎯
              </div>

              <div>
                <span className="rounded-full bg-violet-700 px-4 py-2 text-xs font-bold">
                  NUESTRA MISIÓN
                </span>

                <h2 className="mt-5 text-2xl font-bold leading-9">
                  Facilitar el acceso a oportunidades de formación y ayudar a
                  cada persona a encontrar su camino.
                </h2>
              </div>

            </div>

            <div className="border-l border-violet-400 pl-8">
              <p className="text-3xl font-semibold italic text-violet-300">
                Aprender también es
                <span className="block text-cyan-400">
                  una oportunidad.
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* QUÉ ENCONTRÁS */}
      <section className="px-6 py-10 md:px-16">
        <div className="mx-auto max-w-6xl">

          <span className="rounded-full bg-violet-800 px-4 py-2 text-xs font-bold">
            ¿QUÉ ENCONTRARÁS EN REDUCAR?
          </span>

          <h2 className="mt-5 text-4xl font-extrabold">
            Todo en
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}un mismo lugar
            </span>
          </h2>


          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-5">

            <div className="rounded-2xl border border-blue-700 bg-[#07143a] p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl">
                📚
              </div>

              <p className="mt-4 font-semibold">
                Cursos
              </p>
            </div>


            <div className="rounded-2xl border border-blue-700 bg-[#07143a] p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl">
                🗺️
              </div>

              <p className="mt-4 font-semibold">
                Rutas de aprendizaje
              </p>
            </div>


            <div className="rounded-2xl border border-violet-700 bg-[#07143a] p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl">
                👤
              </div>

              <p className="mt-4 font-semibold">
                Test vocacional
              </p>
            </div>


            <div className="rounded-2xl border border-violet-700 bg-[#07143a] p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl">
                🏛️
              </div>

              <p className="mt-4 font-semibold">
                Instituciones
              </p>
            </div>


            <div className="rounded-2xl border border-violet-700 bg-[#07143a] p-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl">
                📅
              </div>

              <p className="mt-4 font-semibold">
                Novedades
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#101b62] via-[#07143a] to-[#101b62] px-6 py-14 text-center">

        <div className="relative z-10">

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Empezá a explorar oportunidades
          </h2>

          <p className="mt-3 text-slate-300">
            Tu próximo aprendizaje puede estar a un clic.
          </p>

          <button className="mt-7 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 px-8 py-3 font-bold transition hover:scale-105">
            Explorar cursos →
          </button>

        </div>

        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-700/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      </section>

    </main>
  );
}