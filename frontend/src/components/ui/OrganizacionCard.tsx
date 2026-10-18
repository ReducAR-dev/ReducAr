// src/components/features/OrganizacionCard.tsx
interface OrganizacionCardProps {
  nombre: string;
  logo: string;
  descripcion: string;
  categoria?: string;
  cursos: number;
  link?: string;
  destacada?: boolean;
  className?: string;
}

export const OrganizacionCard = ({ nombre, logo, descripcion, cursos, link, destacada = false, className = "" }: OrganizacionCardProps) => {
  const content = (
    <>
      <div className="relative w-full">
        <div className="w-full h-[180px] flex items-center justify-center px-8 py-5 bg-[#f7f7fa] rounded-xl overflow-hidden">
          <img src={logo} alt={`Logo de ${nombre}`} className="max-w-[380px] max-h-[135px] w-full h-full object-contain" loading="lazy" />
        </div>
        {destacada && (
          <span className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1.5 text-[10px] font-extrabold text-white bg-reducar-primary rounded-full">Destacada</span>
        )}
      </div>

      <div className="w-full mt-4 text-left">
        <h2 className="mb-2 text-xl font-extrabold text-white leading-snug">{nombre}</h2>
        <p className="m-0 text-xs text-reducar-text-secondary leading-relaxed">{descripcion}</p>
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-reducar-border">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 grid place-items-center rounded-lg bg-reducar-primary-light text-reducar-primary text-xs">▣</span>
          <div className="flex items-center gap-1 text-[10px] text-reducar-text-secondary">
            <strong className="text-xs text-white">{cursos}</strong>
            <span>{cursos === 1 ? " curso disponible" : " cursos disponibles"}</span>
          </div>
        </div>
      </div>
    </>
  );

  const baseClasses = `flex flex-col p-5 bg-reducar-surface border border-reducar-primary/40 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-reducar-primary hover:shadow-2xl transition-all ${className}`;

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={baseClasses} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
        {content}
      </a>
    );
  }
  return <div className={baseClasses}>{content}</div>;
};

export default OrganizacionCard;