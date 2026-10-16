// src/App.tsx

// ============================================
// Core / Router
// ============================================
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// ============================================
// Páginas públicas
// ============================================
import Homepage from "./pages/Homepage";
import Cursospage from "./pages/Cursospage";
import TestPage from "./pages/TestPage";
import OrganizacionesPage from "./pages/OrganizacionesPage";
import NovedadesPage from "./pages/NovedadesPage";
import RutasPage from "./pages/RutasPage";
import NosotrosPage from "./pages/NosotrosPage";
import AyudaPage from "./pages/AyudaPage";
import ContactoPage from "./pages/ContactoPage";
import PreguntasFrecuentesPage from "./pages/PreguntasFrecuentesPage";
import PoliticasPrivacidadPage from "./pages/PoliticasPrivacidadPage";
import TerminosCondicionesPage from "./pages/TerminosCondicionesPage";
import ComoFuncionaPage from "./pages/ComoFuncionaPage";
import TestimoniosPage from "./pages/TestimoniosPage";

// ============================================
// Autenticación
// ============================================
import Login from "./pages/Loginpage";
import Register from "./pages/Registropage";

// ============================================
// Páginas de usuario logueado
// ============================================
import MiCuentaPage from "./pages/MiCuentaPage";
import MisFavoritosPage from "./pages/MisFavoritosPage";
import MisCursosPage from "./pages/MisCursosPage";
import MisReportesPage from "./pages/MisReportesPage";
import PerfilPage from "./pages/PerfilPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";

// ============================================
// Páginas de administración
// ============================================
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCursosPage from "./pages/admin/AdminCursosPage";
import AdminUsuariosPage from "./pages/admin/AdminUsuariosPage";
import AdminReportesPage from "./pages/admin/AdminReportesPage";
import AdminValoracionesPage from "./pages/admin/AdminValoracionesPage";

// ============================================
// Páginas de error
// ============================================
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";

function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          {/* ============================================
              Sitio público + usuario logueado (MainLayout)
             ============================================ */}
          <Route path="/" element={<MainLayout />}>
            {/* --- Público --- */}
            <Route index element={<Homepage />} />
            <Route path="/cursos" element={<Cursospage />} />
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

            {/* --- Usuario logueado --- */}
            <Route path="/mi-cuenta" element={<MiCuentaPage />} />
            <Route path="/mi-cuenta/favoritos" element={<MisFavoritosPage />} />
            <Route path="/mi-cuenta/cursos" element={<MisCursosPage />} />
            <Route path="/mi-cuenta/reportes" element={<MisReportesPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />

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
          </Route>

          {/* ============================================
              Administración (AdminLayout)
             ============================================ */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="cursos" element={<AdminCursosPage />} />
            <Route path="usuarios" element={<AdminUsuariosPage />} />
            <Route path="reportes" element={<AdminReportesPage />} />
            <Route path="valoraciones" element={<AdminValoracionesPage />} />
          </Route>
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  );
}

export default App;