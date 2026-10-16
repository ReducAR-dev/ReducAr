// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import PerfilPage from "./pages/PerfilPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import Cursospage from "./pages/Cursospage";
import TestPage from "./pages/TestPage";
import OrganizacionesPage from "./pages/OrganizacionesPage";
import NovedadesPage from "./pages/NovedadesPage";
import Login from "./pages/Loginpage";
import Register from "./pages/Registropage";
import RutasPage from "./pages/RutasPage";
import NosotrosPage from "./pages/NosotrosPage";
import AyudaPage from "./pages/AyudaPage";
import ContactoPage from "./pages/ContactoPage";
import PreguntasFrecuentesPage from "./pages/PreguntasFrecuentesPage";
import PoliticasPrivacidadPage from "./pages/PoliticasPrivacidadPage";
import TerminosCondicionesPage from "./pages/TerminosCondicionesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthBootstrap } from "./components/AuthBootstrap";

import { MainLayout } from "./layouts/Mainlayout";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/cursos" element={<Cursospage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  );
}

export default App;