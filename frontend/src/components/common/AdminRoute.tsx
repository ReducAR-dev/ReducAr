import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export const AdminRoute = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const rol_id = useAuthStore((s) => s.perfil?.rol_id);

  // 1. Si no hay token, lo mandamos al login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si hay token pero NO es admin (rol_id distinto de 1), lo mandamos al home
  if (rol_id !== 1) {
    return <Navigate to="/" replace />;
  }

  // 3. Si tiene token y es admin, le permitimos ver el contenido (Outlet)
  return <Outlet />;
};