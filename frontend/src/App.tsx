// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
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

import { MainLayout } from "./layouts/Mainlayout";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
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
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;