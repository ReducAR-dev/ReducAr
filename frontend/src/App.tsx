import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Cursospage from "./pages/Cursospage";
import TestPage from "./pages/TestPage";
import OrganizacionesPage from "./pages/OrganizacionesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cursos" element={<Cursospage />} />
        <Route path="/test" element={<TestPage />} />

        <Route
          path="/instituciones"
          element={<OrganizacionesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;