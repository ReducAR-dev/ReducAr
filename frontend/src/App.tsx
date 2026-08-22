import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import CursosPage from "./pages/Cursospage";
import TestPage from "./pages/TestPage";
import ChatBot from "./components/features/chatbot/ChatBot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
