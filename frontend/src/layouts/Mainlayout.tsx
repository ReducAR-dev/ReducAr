import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import ChatBot from "../components/features/chatbot/ChatBot";

export const MainLayout = () => {
    return (
        <div>
            <div>
                <Header />
            </div>

            <main>
                <Outlet />
            </main>

            <Footer />
            <ChatBot />
        </div>
    );
};