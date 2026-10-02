import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Cursospage from "./pages/Cursospage";
import TestPage from "./pages/TestPage";
import OrganizacionesPage from "./pages/OrganizacionesPage";
import NovedadesPage from "./pages/NovedadesPage";
import Login from "./pages/Loginpage";
import Register from "./pages/Registropage";
import RutasPage from "./pages/RutasPage";
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