// src/pages/admin/AdminDashboardPage.tsx
import { useAuthStore } from "../../stores/auth.store";

// ===== Datos ficticios =====
const kpis = [
  { label: "Usuarios totales", value: "2.847", delta: "+12,5%", trend: "up" as const },
  { label: "Cursos activos", value: "312", delta: "+4,2%", trend: "up" as const },
  { label: "Ingresos del mes", value: "$48.230", delta: "+8,7%", trend: "up" as const },
  { label: "Reportes pendientes", value: "7", delta: "-23%", trend: "down" as const },
];

const monthlyData = [
  { mes: "Ene", valor: 45 }, { mes: "Feb", valor: 62 }, { mes: "Mar", valor: 78 },
  { mes: "Abr", valor: 55 }, { mes: "May", valor: 89 }, { mes: "Jun", valor: 112 },
  { mes: "Jul", valor: 98 }, { mes: "Ago", valor: 134 }, { mes: "Sep", valor: 156 },
  { mes: "Oct", valor: 178 }, { mes: "Nov", valor: 195 }, { mes: "Dic", valor: 210 },
];

const trafficSources = [
  { label: "Búsqueda orgánica", pct: 42, color: "#7b6cf6" },
  { label: "Directo", pct: 28, color: "#3fd9c9" },
  { label: "Redes sociales", pct: 18, color: "#f59e0b" },
  { label: "Referidos", pct: 12, color: "#ef4444" },
];

const topPages = [
  { ruta: "/cursos", visitas: 12480, pct: 92 },
  { ruta: "/", visitas: 9820, pct: 74 },
  { ruta: "/rutas", visitas: 5430, pct: 41 },
  { ruta: "/test", visitas: 4210, pct: 32 },
  { ruta: "/instituciones", visitas: 2840, pct: 21 },
];

const lowPages = [
  { ruta: "/mapa-del-sitio", visitas: 42, pct: 3 },
  { ruta: "/terminos-condiciones", visitas: 89, pct: 7 },
  { ruta: "/politicas-privacidad", visitas: 104, pct: 8 },
];

const recentActivity = [
  { tipo: "user", msg: "Nuevo usuario registrado: María López", hace: "hace 5 min" },
  { tipo: "course", msg: "Curso publicado: Introducción a Python", hace: "hace 23 min" },
  { tipo: "report", msg: "Reporte #482 resuelto por admin", hace: "hace 1 h" },
  { tipo: "rating", msg: "Nueva valoración en Curso de UX", hace: "hace 2 h" },
  { tipo: "purchase", msg: "Venta: Curso de Data Science — $89", hace: "hace 3 h" },
];

export default function AdminDashboardPage() {
  const perfil = useAuthStore((s) => s.perfil);
  const nombre = perfil?.nombre ?? "Admin";

  const maxMonthly = Math.max(...monthlyData.map((d) => d.valor));

  return (
    <div className="space-y-6">
      {/* ===== Bienvenida ===== */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Hola, {nombre} 👋
          </h1>
          <p className="text-sm text-reducar-text-secondary mt-1">
            Este es el resumen de ReducAR en los últimos 30 días.
          </p>
        </div>
        <span className="text-xs text-reducar-text-secondary">
          Última actualización: hace 2 min
        </span>
      </div>

      {/* ===== KPIs ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-reducar-surface p-5 rounded-2xl border border-reducar-border shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-reducar-text-secondary mb-2">
              {k.label}
            </p>
            <p className="text-3xl font-extrabold">{k.value}</p>
            <p
              className={`text-xs font-semibold mt-2 ${
                k.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {k.trend === "up" ? "▲" : "▼"} {k.delta} vs mes anterior
            </p>
          </div>
        ))}
      </div>

      {/* ===== Gráfico de registros + Actividad ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de barras */}
        <div className="lg:col-span-2 bg-reducar-surface p-6 rounded-2xl border border-reducar-border shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-extrabold">Registros por mes</h2>
              <p className="text-xs text-reducar-text-secondary mt-0.5">
                Nuevos usuarios en lo que va del año
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-reducar-primary/15 text-reducar-primary text-xs font-bold">
              2026
            </span>
          </div>

          <div className="flex items-end gap-2 h-48">
            {monthlyData.map((d) => {
              const h = (d.valor / maxMonthly) * 100;
              return (
                <div key={d.mes} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-linear-to-t from-reducar-primary to-reducar-turquoise-dark hover:opacity-90 transition-opacity cursor-pointer"
                      style={{ height: `${h}%` }}
                      title={`${d.mes}: ${d.valor} nuevos`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-reducar-text-secondary">
                    {d.mes}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border shadow-sm">
          <h2 className="text-lg font-extrabold mb-4">Actividad reciente</h2>
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span
                  className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    a.tipo === "user"
                      ? "bg-reducar-primary"
                      : a.tipo === "course"
                      ? "bg-reducar-turquoise"
                      : a.tipo === "report"
                      ? "bg-yellow-500"
                      : a.tipo === "rating"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-reducar-text truncate">{a.msg}</p>
                  <p className="text-xs text-reducar-text-secondary">{a.hace}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Fuentes de tráfico + Páginas ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut de tráfico */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border shadow-sm">
          <h2 className="text-lg font-extrabold mb-6">Fuentes de tráfico</h2>
          <div className="flex items-center gap-6">
            {/* Donut con conic-gradient */}
            <div
              className="w-32 h-32 rounded-full shrink-0"
              style={{
                background: `conic-gradient(
                  ${trafficSources[0].color} 0% ${trafficSources[0].pct}%,
                  ${trafficSources[1].color} ${trafficSources[1].pct}% ${trafficSources[0].pct + trafficSources[1].pct}%,
                  ${trafficSources[2].color} ${trafficSources[0].pct + trafficSources[1].pct}% ${trafficSources[0].pct + trafficSources[1].pct + trafficSources[2].pct}%,
                  ${trafficSources[3].color} ${trafficSources[0].pct + trafficSources[1].pct + trafficSources[2].pct}% 100%
                )`,
              }}
            >
              <div className="w-full h-full rounded-full bg-reducar-surface grid place-items-center">
                <div className="w-20 h-20 rounded-full bg-reducar-surface grid place-items-center">
                  <span className="text-xs font-bold text-reducar-text-secondary">
                    Tráfico
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 flex-1 min-w-0">
              {trafficSources.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="flex-1 truncate text-reducar-text-secondary">
                    {s.label}
                  </span>
                  <span className="font-bold">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Páginas más visitadas */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border shadow-sm">
          <h2 className="text-lg font-extrabold mb-4">Más visitadas</h2>
          <ul className="space-y-3">
            {topPages.map((p) => (
              <li key={p.ruta}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-reducar-text">{p.ruta}</span>
                  <span className="text-reducar-text-secondary font-semibold">
                    {p.visitas.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-reducar-surface-soft overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-reducar-primary to-reducar-turquoise"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Páginas menos visitadas */}
        <div className="bg-reducar-surface p-6 rounded-2xl border border-reducar-border shadow-sm">
          <h2 className="text-lg font-extrabold mb-4">Menos visitadas</h2>
          <ul className="space-y-3">
            {lowPages.map((p) => (
              <li key={p.ruta}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-reducar-text">{p.ruta}</span>
                  <span className="text-reducar-text-secondary font-semibold">
                    {p.visitas.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-reducar-surface-soft overflow-hidden">
                  <div
                    className="h-full bg-red-500/70"
                    style={{ width: `${Math.max(p.pct, 5)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-reducar-text-secondary mt-4 leading-relaxed">
            Sugerencia: revisar por qué estas páginas reciben poco tráfico.
          </p>
        </div>
      </div>
    </div>
  );
}