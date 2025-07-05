import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUniformCourseWithNeighborsApi } from "../../services/uniforms/api";
import type { Course } from "../../services/courses/api";

const UniformCourseDetailPage: React.FC = () => {
  const { uniformId, courseId } = useParams<{
    uniformId: string;
    courseId: string;
  }>();
  const [data, setData] = useState<{
    course: Course | null;
    previous: Course | null;
    next: Course | null;
  }>({ course: null, previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("authorId") || undefined;
  const positionId = searchParams.get("positionId") || undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (!uniformId || !courseId) return;
    setLoading(true);
    getUniformCourseWithNeighborsApi(uniformId, courseId, {
      authorId,
      positionId,
    })
      .then(setData)
      .finally(() => setLoading(false));
  }, [uniformId, courseId, authorId, positionId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
        <div className="text-gray-600">Cargando curso...</div>
      </div>
    );
  if (!data.course)
    return (
      <div className="p-8 text-center text-red-600">Curso no encontrado</div>
    );

  // Construir la URL de regreso con filtros si existen
  const backUrl = `/uniforms/${uniformId}/courses` + (authorId || positionId ? `?${searchParams.toString()}` : "");

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Botón rectangular de volver */}
      <button
        onClick={() => navigate(backUrl)}
        className="mb-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition-colors focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Volver a la lista de cursos"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Volver</span>
      </button>
      <div className="relative aspect-video mb-4">
        <video
          src={data.course.videoUrl}
          controls
          className="w-full h-full bg-black"
          poster={data.course.thumbnailUrl}
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{data.course.title}</h1>
      <p className="text-gray-600 mb-4">{data.course.description}</p>
      <div className="flex justify-between mt-8">
        <button
          disabled={!data.previous}
          onClick={() =>
            data.previous &&
            navigate(
              `/uniforms/${uniformId}/courses/${data.previous.id}?${searchParams.toString()}`
            )
          }
          className="p-2 border border-gray-300 text-black font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white"
          aria-label="Curso anterior"
        >
          &lt;
        </button>
        <button
          disabled={!data.next}
          onClick={() =>
            data.next &&
            navigate(
              `/uniforms/${uniformId}/courses/${data.next.id}?${searchParams.toString()}`
            )
          }
          className="p-2 border border-gray-300 text-black font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white"
          aria-label="Curso siguiente"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default UniformCourseDetailPage;
