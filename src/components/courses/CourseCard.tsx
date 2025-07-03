import { Link } from "react-router-dom";
import { useState } from "react";
import type { Course } from "../../services/roadmaps/api";

interface CourseCardProps {
  course: Course;
  orderInRoadmap?: number;
  roadmapId?: string;
}

function CourseCard({ course, orderInRoadmap, roadmapId }: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg group">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Badge de orden en el roadmap */}
        {orderInRoadmap && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 font-medium tracking-wide transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:bg-opacity-90">
            {orderInRoadmap}
          </span>
        )}
        {course.duration && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 font-medium tracking-wide transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:bg-opacity-90">
            {course.duration < 60
              ? `${course.duration}:00`
              : `${Math.floor(course.duration / 60)}h:${(course.duration % 60)
                  .toString()
                  .padStart(2, "0")}`}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-medium text-black mb-2 uppercase tracking-wide transition-colors duration-300 ease-out group-hover:text-gray-800">
          {course.title}
        </h2>
        {course.author?.name && (
          <span className="text-xs text-gray-600 mb-2 block">
            {course.author.name}
          </span>
        )}
        {/* Información adicional del curso */}
        <div className="mb-2 flex flex-wrap gap-1">
          {course.position && (
            <span className="inline-block border border-gray-300 text-gray-700 text-xs px-2 py-1 transition-all duration-300 ease-out transform group-hover:scale-105 group-hover:border-gray-400 group-hover:bg-gray-50">
              {course.position.name}
            </span>
          )}
          {course.uniform && (
            <span className="inline-block border border-gray-300 text-gray-700 text-xs px-2 py-1 transition-all duration-300 ease-out transform group-hover:scale-105 group-hover:border-gray-400 group-hover:bg-gray-50">
              {course.uniform.name}
            </span>
          )}
        </div>
        {course.description && (
          <div className="mb-4">
            {isExpanded && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}
            <button
              onClick={handleToggleDescription}
              className="text-xs text-gray-500 hover:text-black font-medium tracking-wide transition-colors duration-200"
              aria-label={
                isExpanded ? "Ocultar información" : "Leer información"
              }
            >
              {isExpanded ? "Ocultar información" : "Leer información"}
            </button>
          </div>
        )}
        <Link
          to={`/courses/${course.id}`}
          state={{ roadmapId, courseId: course.id }}
          className="inline-block mt-auto text-xs font-medium text-black hover:underline tracking-wide transition-all duration-300 ease-out transform hover:translate-x-1 hover:text-gray-700"
          aria-label={`Ver curso ${course.title}`}
        >
          Ver curso
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
