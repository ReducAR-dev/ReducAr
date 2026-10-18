// src/pages/CarritoPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ItemCarrito {
  id: number;
  titulo: string;
  institucion: string;
  precio: number;
  imagen: string;
}

const ITEMS_INICIALES: ItemCarrito[] = [
  {
    id: 1,
    titulo: "Desarrollo Web Full Stack con React y Node.js",
    institucion: "UTN Tecnológica",
    precio: 45000,
    imagen: "💻",
  },
  {
    id: 2,
    titulo: "Gestión de Proyectos Ágiles y Scrum",
    institucion: "Fundación Telefónica",
    precio: 28000,
    imagen: "📊",
  },
];

export default function CarritoPage() {
  const [items, setItems] = useState<ItemCarrito[]>(ITEMS_INICIALES);
  const [comprado, setComprado] = useState(false);
  const navigate = useNavigate();

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.precio, 0);

  const handleCheckout = () => {
    setComprado(true);
    setTimeout(() => {
      setItems([]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <div className="mb-8 rounded-2xl border border-reducar-primary/40 bg-reducar-shell-surface p-6 md:p-8 shadow-xl">
          <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-xs font-bold text-reducar-primary">
            CARRITO DE COMPRAS (VISTA NUEVA)
          </span>
          <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
            Tu Carrito de Cursos
          </h1>
          <p className="text-reducar-shell-text-secondary text-sm mt-1">
            Revisa los cursos seleccionados antes de proceder a la inscripción o pago simulado.
          </p>
        </div>

        {comprado && items.length > 0 && (
          <div className="mb-6 rounded-2xl border border-emerald-500 bg-emerald-500/10 p-6 text-emerald-600 dark:text-emerald-300 shadow-lg">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>🎉</span> ¡Compra o inscripción realizada con éxito!
            </h3>
            <p className="text-sm mt-1">
              Los cursos ya están disponibles en tu sección de <a href="/mi-cuenta/cursos" className="underline font-bold">Mis Cursos</a>.
            </p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-reducar-shell-text">Tu carrito está vacío</h3>
            <p className="text-sm text-reducar-shell-text-secondary mt-2 mb-6">
              Explora nuestro catálogo y agrega cursos a tu carrito para comenzar tu formación.
            </p>
            <button
              type="button"
              onClick={() => navigate("/cursos")}
              className="rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
            >
              Explorar Cursos
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">

            {/* LISTA DE ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-5 shadow-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-reducar-bg border border-reducar-shell-border flex items-center justify-center text-3xl shadow-inner">
                      {item.imagen}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-reducar-shell-text line-clamp-1">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-reducar-shell-text-secondary mt-1">
                        🏛️ {item.institucion}
                      </p>
                      <p className="text-sm font-extrabold text-reducar-primary mt-1">
                        ${item.precio.toLocaleString("es-AR")} ARS
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarItem(item.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* RESUMEN DE PAGO */}
            <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl h-fit space-y-4">
              <h3 className="text-lg font-bold text-reducar-shell-text border-b border-reducar-shell-border pb-3">
                Resumen de Compra
              </h3>

              <div className="space-y-2 text-sm text-reducar-shell-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-AR")} ARS</span>
                </div>
                <div className="flex justify-between">
                  <span>Descuento aplicado</span>
                  <span className="text-emerald-500 font-semibold">$0 ARS</span>
                </div>
                <div className="border-t border-reducar-shell-border pt-2 flex justify-between text-base font-bold text-reducar-shell-text">
                  <span>Total</span>
                  <span className="text-reducar-primary">${total.toLocaleString("es-AR")} ARS</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Confirmar Inscripción / Pago
              </button>

              <p className="text-[11px] text-center text-reducar-shell-text-secondary">
                🔒 Transacción segura simulada para demostración en ReducAR.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
