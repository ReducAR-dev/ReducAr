import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export const UserRoute = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const location = useLocation();

  // Si no hay token, redirigimos al login, pero guardamos a dónde quería ir
  // para que, tras loguearse, vuelva a esa misma ruta.
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};