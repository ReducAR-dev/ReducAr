import { Link } from "react-router-dom";
import { primaryActionClass, secondaryActionClass } from "../../components/common/StaticPageLayout";

export default function Error500Page() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-reducar-bg px-4 py-16 text-center text-reducar-text">
      <div className="max-w-xl rounded-3xl border border-reducar-border bg-reducar-surface p-7 shadow-xl sm:p-10">
        <span className="inline-flex rounded-full bg-reducar-primary-light px-4 py-2 text-xs font-extrabold text-reducar-primary">ERROR 500</span>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Algo no salió como esperábamos</h1>
        <p className="mt-4 leading-7 text-reducar-text-secondary">Podés volver a intentarlo o regresar al inicio mientras revisamos el problema.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => window.location.reload()} className={primaryActionClass}>Reintentar</button>
          <Link to="/" className={secondaryActionClass}>Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}
