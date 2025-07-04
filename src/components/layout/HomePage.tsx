import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoadmapsApi } from "../../services/roadmaps/api";
import { Helmet } from "react-helmet";

interface RoadmapContextProps {
  roadmap: any | null;
  title: any | null;
  description: any | null;
  thumbnailUrl: any | null;
  id: any | null;
  courses?: any[];
}

const HomePage = () => {
  const [roadmaps, setRoadmaps] = useState<RoadmapContextProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setIsLoading(true);
        const data = await getRoadmapsApi();
        setRoadmaps(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <Helmet>
        <title>Valhalla Jiu Jitsu + | Plataforma de Aprendizaje</title>
      </Helmet>
      {/* Header HomePage */}
      <header className="w-full flex flex-col sm:flex-row items-center justify-between px-2 sm:px-8 py-2 sm:py-4 border-b border-black gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <img src="/valhalla-icon.png" alt="Valhalla Logo" className="h-8 w-8" />
          <span className="font-bold text-xl tracking-widest uppercase text-black">Valhalla</span>
        </div>
        <Link
          to="/login"
          tabIndex={0}
          aria-label="Iniciar sesión"
          className="w-full sm:w-auto block bg-black text-white font-bold uppercase tracking-wider rounded border-2 border-black hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black px-4 py-1 text-sm min-h-[2.25rem] text-center"
        >
          Iniciar Sesión
        </Link>
      </header>
      {/* Banner Section */}
      <section className="w-full bg-white text-black py-8 md:py-24 px-2 sm:px-8">
        <h1 className="text-2xl md:text-6xl font-bold mb-4 uppercase tracking-wider">VALHALLA JIU JITSU +</h1>
        <p className="text-base md:text-2xl mb-8 max-w-2xl">Domina el arte del Jiu Jitsu con nuestras rutas de aprendizaje estructuradas y contenido de alta calidad</p>
      </section>
      {/* Rutas de Aprendizaje alineadas a la izquierda */}
      <section className="w-full py-2 md:py-8 px-2 sm:px-8">
        <div className="max-w mx-auto">
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wide mb-6 text-left text-black">RUTAS DE APRENDIZAJE</h2>
          {isLoading ? (
            <div className="flex justify-start items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-black border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-start items-start">
              {roadmaps.slice(0, 6).map((roadmap) => (
                <Link
                  key={roadmap.id}
                  to={`/login`}
                  tabIndex={0}
                  aria-label={`Ver ruta ${roadmap.title}`}
                  className="group block bg-white border border-black hover:bg-black hover:text-white transition-all duration-300 rounded overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-left"
                  style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
                >
                  <div className="relative w-full h-48 bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src={roadmap.thumbnailUrl}
                      alt={roadmap.title}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-all duration-300"
                    />
                  </div>
                  <div className="flex-1 flex items-center p-6">
                    <h3 className="font-bold uppercase tracking-wide w-full">
                      {roadmap.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
