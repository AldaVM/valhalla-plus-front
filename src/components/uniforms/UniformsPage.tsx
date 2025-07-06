import { useEffect, useState } from "react";
import { getUniformsApi, type Uniform } from "../../services/uniforms/api";
import UniformCard from "./UniformCard";
import { Helmet } from "react-helmet";

const UniformsPage: React.FC = () => {
  const [uniforms, setUniforms] = useState<Uniform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniforms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUniformsApi();
        setUniforms(data);
      } catch (error) {
        console.error("Error fetching uniforms:", error);
        setError("Error al cargar los uniformes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniforms();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Valhalla Jiu Jitsu + | Uniformes</title>
      </Helmet>
      <div className="w-full py-8">
        <div className="mb-8 w-full">
          <h1 className="text-3xl font-medium text-black dark:text-white mb-4 uppercase tracking-wide w-full">
            Uniformes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl w-full">
            Técnicas con GI y sin GI y descubre técnicas específicas para cada estilo de Jiu Jitsu
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-24 w-full">
            <div className="text-center w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Cargando uniformes...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-24 w-full">
            <div className="text-center w-full">
              <div className="text-red-600 dark:text-red-400 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : uniforms.length === 0 ? (
          <div className="flex justify-center items-center py-24 w-full">
            <div className="text-center w-full">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">No se encontraron uniformes disponibles.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 w-full">
            {uniforms.map((uniform) => (
              <UniformCard key={uniform.id} uniform={uniform} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniformsPage; 