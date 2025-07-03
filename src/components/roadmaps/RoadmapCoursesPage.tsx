import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getRoadmapCoursesApi } from "../../services/roadmaps/api";
import type { RoadmapCourseWithOrder, RoadmapCoursesListResponse } from "../../services/roadmaps/api";
import CourseCard from "../courses/CourseCard";
import RoadmapCoursesList from "./RoadmapCoursesList";

const RoadmapCoursesPage = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id: stateId,
    roadmapTitle,
    roadmapDescription,
  } = location.state || {};
  const roadmapId = stateId || urlId;
  const [coursesData, setCoursesData] = useState<RoadmapCoursesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [rawResponse, setRawResponse] = useState<any>(null); // Debug state

  useEffect(() => {
    const fetchCourses = async () => {
      if (!roadmapId) {
        setError("No se encontró el ID del roadmap");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getRoadmapCoursesApi(roadmapId);
        console.log('Roadmap courses data:', data); // Debug log
        setRawResponse(data); // Debug: guardar respuesta raw
        
        // Validar estructura de datos
        if (!data || typeof data !== 'object') {
          throw new Error('Respuesta inválida del servidor');
        }
        
        if (!Array.isArray(data.courses)) {
          throw new Error('Formato de cursos inválido');
        }
        
        setCoursesData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching roadmap courses:', err); // Debug log
        const errorMessage = err instanceof Error ? err.message : "Error al cargar los cursos del roadmap";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [roadmapId]);

  if (!roadmapId) {
    navigate("/roadmaps", { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          {/* Debug: mostrar respuesta raw si hay error */}
          {rawResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-left max-w-2xl overflow-auto">
              <h3 className="font-bold mb-2">Debug - Respuesta del servidor:</h3>
              <pre className="text-xs">{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 mt-4"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!coursesData || coursesData.courses.length === 0) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            No se encontraron cursos en este roadmap
          </p>
          {/* Debug: mostrar respuesta raw si no hay cursos */}
          {rawResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-left max-w-2xl overflow-auto">
              <h3 className="font-bold mb-2">Debug - Respuesta del servidor:</h3>
              <pre className="text-xs">{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full py-8">
        {/* Header */}
        <div className="mb-8 w-full">
          <h1 className="text-3xl font-medium text-black mb-4 uppercase tracking-wide w-full">
            {roadmapTitle || "Cursos del Roadmap"}
          </h1>
          {roadmapDescription && (
            <p className="text-gray-600 mb-4 w-full">{roadmapDescription}</p>
          )}
          <p className="text-gray-600 w-full">
            {coursesData.totalCourses} curso{coursesData.totalCourses !== 1 ? "s" : ""} disponible
            {coursesData.totalCourses !== 1 ? "s" : ""}
            {coursesData.totalDuration > 0 && (
              <span className="ml-2">
                • {coursesData.totalDuration < 60
                  ? `${coursesData.totalDuration} min`
                  : `${Math.floor(coursesData.totalDuration / 60)}h ${(coursesData.totalDuration % 60).toString().padStart(2, '0')} min`
                }
              </span>
            )}
          </p>
        </div>
        {/* Toggle de vista */}
        <div className="mb-6 flex justify-end w-full">
          <div className="flex border border-gray-300">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                viewMode === "cards"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-4 h-4 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Tarjetas
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-4 h-4 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Lista
            </button>
          </div>
        </div>
        {/* Contenido */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 w-full">
            {coursesData.courses.map((courseItem: RoadmapCourseWithOrder) => (
              <CourseCard
                key={courseItem.course.id}
                course={courseItem.course}
                orderInRoadmap={courseItem.orderInRoadmap}
                roadmapId={roadmapId}
              />
            ))}
          </div>
        ) : (
          <RoadmapCoursesList courses={coursesData.courses} roadmapId={roadmapId} />
        )}
      </div>
    </div>
  );
};

export default RoadmapCoursesPage;
