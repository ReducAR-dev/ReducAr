import type { ReactNode } from "react";

interface StaticPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export const primaryActionClass =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-reducar-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl";

export const secondaryActionClass =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-reducar-border bg-reducar-surface px-5 py-3 text-sm font-extrabold text-reducar-text transition hover:border-reducar-primary/40 hover:bg-reducar-primary-light";


export function StaticPageLayout({ eyebrow, title, description, children, actions }: StaticPageLayoutProps) {
  return (
    <main className="min-h-screen bg-reducar-bg text-reducar-text">
      <section className="relative overflow-hidden border-b border-reducar-border">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(123,108,246,0.18),transparent_32%),radial-gradient(circle_at_88%_16%,rgba(63,217,201,0.14),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <span className="inline-flex rounded-full border border-reducar-primary/25 bg-reducar-primary-light px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-reducar-primary">
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-reducar-text-secondary sm:text-base sm:leading-8">
            {description}
          </p>
          {actions && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions}
            </div>
          )}
        </div>
      </section>

      {/* 👇 Reducimos el padding de la zona de contenido inferior */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {children}
      </div>
    </main>
  );
}



export function InfoCard({ icon, title, children, className = "" }: InfoCardProps) {
  return (
    <article
      className={`rounded-2xl border border-reducar-border bg-reducar-surface p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-reducar-primary/35 hover:shadow-lg sm:p-6 ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-reducar-primary-light text-2xl text-reducar-primary">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-extrabold text-reducar-text">{title}</h2>
      <div className="mt-2 text-sm leading-7 text-reducar-text-secondary sm:text-base">
        {children}
      </div>
    </article>
  );
}

interface SectionHeadingProps {
  title: string;
  description?: string;
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <header className="mb-7 max-w-3xl">
      <h2 className="text-2xl font-extrabold text-reducar-text sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-7 text-reducar-text-secondary sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

