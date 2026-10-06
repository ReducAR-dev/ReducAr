// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-reducar-bg text-reducar-text">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};