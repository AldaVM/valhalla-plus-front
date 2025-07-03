import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-black mb-4">404</h1>
      <p className="text-lg text-black mb-8">Página no encontrada</p>
      <Link
        to="/roadmaps"
        className="px-6 py-2 bg-black text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Volver a rutas de aprendizaje"
      >
        Ir a rutas de aprendizaje
      </Link>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage; 