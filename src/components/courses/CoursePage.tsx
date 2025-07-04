import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  getCourseWithNeighborsApi,
  getRoadmapByIdApi,
  type RoadmapCourseWithOrder,
} from "../../services/roadmaps/api";

interface CourseWithNeighbors {
  course: RoadmapCourseWithOrder | null;
  previous: RoadmapCourseWithOrder | null;
  next: RoadmapCourseWithOrder | null;
}

function CoursePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roadmapId, courseId } = location.state || {};

  const [data, setData] = useState<CourseWithNeighbors>({
    course: null,
    previous: null,
    next: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    if (!roadmapId || !courseId) {
      navigate("/roadmaps", { replace: true });
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getCourseWithNeighborsApi(roadmapId, courseId);
        setData(res);
        setError(null);
        // Fetch roadmap info
        const roadmapRes = await getRoadmapByIdApi(roadmapId);
        setRoadmap(roadmapRes);
      } catch (err) {
        setError("Error al cargar el curso");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roadmapId, courseId, navigate]);

  const handlePlay = () => setIsPlaying(true);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
  };

  const handleNavigate = (target: "previous" | "next") => {
    const targetCourse = data[target];
    if (targetCourse) {
      navigate(`/courses/${targetCourse.course.id}`, {
        state: { roadmapId, courseId: targetCourse.course.id },
        replace: true,
      });
    }
  };

  if (!roadmapId || !courseId) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (error || !data.course) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "No se encontró el curso"}
          </p>
        </div>
      </div>
    );
  }

  const { course, previous, next } = data;

  // Formatear duración
  const formatDuration = (duration: number) => {
    if (duration < 60) return `${duration}:00`;
    return `${Math.floor(duration / 60)}h:${(duration % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-4xl mx-auto py-4">
        {roadmap && (
          <div className="mb-2 text-xs text-gray-500 uppercase tracking-wider">
            <span className="font-medium">Roadmap:</span>{" "}
            <Link
              to={`/roadmaps/${roadmap.id}/courses`}
              className="underline hover:text-black transition-colors"
            >
              {roadmap.title}
            </Link>
          </div>
        )}
        <h1 className="text-3xl font-medium text-black mb-2 uppercase tracking-wide">
          {course?.course.title}
        </h1>
        <div className="mb-4 text-sm text-gray-700">
          <span className="font-medium">Duración:</span>{" "}
          {course?.course.duration !== undefined &&
            formatDuration(course.course.duration)}
        </div>
        <div className="mb-8">
          {course?.course.videoUrl && !isPlaying && (
            <div className="relative aspect-video cursor-pointer group">
              <img
                src={course.course.thumbnailUrl}
                alt={course.course.title}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center focus:outline-none"
                aria-label="Reproducir video"
                tabIndex={0}
                onClick={handlePlay}
                onKeyDown={handleKeyDown}
              >
                <span className="bg-black bg-opacity-60 p-4 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="w-12 h-12"
                  >
                    <polygon points="9,7 9,17 19,12" fill="white" />
                  </svg>
                </span>
              </button>
            </div>
          )}
          {course?.course.videoUrl && isPlaying && (
            <video
              src={course.course.videoUrl}
              controls
              autoPlay
              className="w-full h-full bg-black"
              poster={course.course.thumbnailUrl}
            />
          )}
        </div>
        <div className="mb-8">
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            {course?.course.description}
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <button
            disabled={!previous}
            onClick={() => handleNavigate("previous")}
            className={`px-4 py-2 border border-gray-300 text-black font-medium transition-colors duration-200 ${
              !previous
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }`}
          >
            Anterior
          </button>
          <button
            disabled={!next}
            onClick={() => handleNavigate("next")}
            className={`px-4 py-2 border border-gray-300 text-black font-medium transition-colors duration-200 ${
              !next
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
