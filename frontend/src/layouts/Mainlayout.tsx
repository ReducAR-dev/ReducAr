// src/layouts/Mainlayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import ChatBot from "../components/features/chatbot/ChatBot";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-reducar-bg text-reducar-text">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};