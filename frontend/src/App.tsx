// ============================================
// Core / Router / Funcionalidades
// ============================================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

// ============================================
// Layouts
// ============================================
import { MainLayout } from "./layouts/Mainlayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// ============================================
// Componentes globales
// ============================================
import { AuthBootstrap } from "./components/AuthBootstrap";
import { UserRoute } from "./components/common/UserRoute";

// ============================================
// Páginas públicas
// ============================================
import Homepage from "./pages/Homepage";
import Cursospage from "./pages/cursos/Cursospage";
import CursoDetallePage from "./pages/cursos/CursoDetallePage";
import TestPage from "./pages/TestPage";
import OrganizacionesPage from "./pages/InstitucionesPage";
import NovedadesPage from "./pages/NovedadesPage";
import RutasPage from "./pages/RutasPage";
import NosotrosPage from "./pages/mas/NosotrosPage";
import AyudaPage from "./pages/mas/AyudaPage";
import ContactoPage from "./pages/mas/ContactoPage";
import PreguntasFrecuentesPage from "./pages/PreguntasFrecuentesPage";
import PoliticasPrivacidadPage from "./pages/PoliticasPrivacidadPage";
import TerminosCondicionesPage from "./pages/TerminosCondicionesPage";
import ComoFuncionaPage from "./pages/mas/ComoFuncionaPage";
import TestimoniosPage from "./pages/mas/TestimoniosPage";
import CarritoPage from "./pages/CarritoPage";
import OportunidadCursoPage from "./pages/OportunidadCursoPage";


// ============================================
// Autenticación
// ============================================
import Login from "./pages/login/Loginpage";
import Register from "./pages/login/Registropage";
import AuthCallbackPage from "./pages/login/AuthCallbackPage";
import ForgotPasswordPage from "./pages/login/ForgotPasswordPage";

// ============================================
// Páginas de usuario logueado
// ============================================
import MiCuentaPage from "./pages/usuario/MiCuentaPage";
import MisFavoritosPage from "./pages/usuario/MisFavoritosPage";
import MisCursosPage from "./pages/usuario/MisCursosPage";
import MisReportesPage from "./pages/usuario/MisReportesPage";
import MisDatosPage from "./pages/usuario/MisDatosPage";
import ConfiguracionPage from "./pages/usuario/ConfiguracionPage";

// ============================================
// Páginas de administración
// ============================================
import { AdminRoute } from "./components/common/AdminRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCursosPage from "./pages/admin/AdminCursosPage";
import AdminUsuariosPage from "./pages/admin/AdminUsuariosPage";
import AdminReportesPage from "./pages/admin/AdminReportesPage";
import AdminValoracionesPage from "./pages/admin/AdminValoracionesPage";

// ============================================
// Páginas de error
// ============================================
import Error404Page from "./pages/errors/Error404Page";
import Error500Page from "./pages/errors/Error500Page";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthBootstrap>
        <Routes>

          {/* ============================================
               Redireccionamiento, sin layout
             ============================================ */}
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          {/* ============================================
              Sitio público + usuario logueado (MainLayout)
             ============================================ */}
          <Route path="/" element={<MainLayout />}>
            {/* --- Público --- */}
            <Route index element={<Homepage />} />
            <Route path="/cursos" element={<Cursospage />} />
            <Route path="/cursos/:id" element={<CursoDetallePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/rutas" element={<RutasPage />} />
            <Route path="/instituciones" element={<OrganizacionesPage />} />
            <Route path="/novedades" element={<NovedadesPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/ayuda" element={<AyudaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentesPage />} />
            <Route path="/politicas-privacidad" element={<PoliticasPrivacidadPage />} />
            <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
            <Route path="/como-funciona" element={<ComoFuncionaPage />} />
            <Route path="/testimonios" element={<TestimoniosPage />} />
            <Route path="/oportunidad-curso" element={<OportunidadCursoPage />} />

            {/* --- Usuario logueado --- */}
            <Route element={<UserRoute />}>
              <Route path="/mi-cuenta" element={<MiCuentaPage />} />
              <Route path="/mi-cuenta/favoritos" element={<MisFavoritosPage />} />
              <Route path="/mi-cuenta/cursos" element={<MisCursosPage />} />
              <Route path="/mi-cuenta/reportes" element={<MisReportesPage />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/perfil" element={<MisDatosPage />} />
              <Route path="/configuracion" element={<ConfiguracionPage />} />
            </Route>

            {/* --- Errores --- */}
            <Route path="/500" element={<Error500Page />} />
            <Route path="*" element={<Error404Page />} />
          </Route>

          {/* ============================================
              Autenticación (AuthLayout)
             ============================================ */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* ============================================
              Administración (AdminLayout)
             ============================================ */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="cursos" element={<AdminCursosPage />} />
              <Route path="usuarios" element={<AdminUsuariosPage />} />
              <Route path="reportes" element={<AdminReportesPage />} />
              <Route path="valoraciones" element={<AdminValoracionesPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  );
}

export default App;