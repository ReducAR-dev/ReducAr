// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { HeaderAdmin } from "../components/common/HeaderAdmin";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-reducar-bg text-reducar-text">
      <HeaderAdmin />

      {/* Nav horizontal en mobile (el sidebar se oculta en < lg) */}
      <AdminSidebar mobile />

      {/* Contenedor principal: sidebar fijo + contenido */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <AdminSidebar />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;