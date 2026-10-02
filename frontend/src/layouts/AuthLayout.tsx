import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";

export const AuthLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};