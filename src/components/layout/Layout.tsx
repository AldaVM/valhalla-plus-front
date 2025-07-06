import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SessionNotification from "../auth/SessionNotification";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors">
      <Header />
      <main className="flex-1 w-full px-2 sm:px-8 py-4">{children}</main>
      <Footer />

      {/* Notificación de sesiones */}
      <SessionNotification />
    </div>
  );
};

export default Layout;
