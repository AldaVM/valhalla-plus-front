import { useEffect, useState } from "react";
import { getRoadmapsApi } from "../../services/roadmaps/api";
import RoadmapCard from "./RoadmapCard";
import { Helmet } from "react-helmet";

interface RoadmapContextProps {
  roadmap: any | null;
  title: any | null;
  description: any | null;
  thumbnailUrl: any | null;
  id: any | null;
}

function RoadmapsPage() {
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
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Valhalla Jiu Jitsu + | Rutas de aprendizaje</title>
      </Helmet>
      <div className="w-full py-8">
        <div className="mb-8 w-full">
          <h1 className="text-3xl font-medium text-black dark:text-white mb-4 uppercase tracking-wide w-full">
            Rutas de aprendizaje
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl w-full">
            Explora nuestras rutas de aprendizaje diseñadas para tu progreso en Jiu Jitsu
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-24 w-full">
            <div className="text-center w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Cargando rutas de aprendizaje...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapsPage;
