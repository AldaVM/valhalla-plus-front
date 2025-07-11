import { Link } from "react-router-dom";
import { useState } from "react";

interface RoadmapCardProps {
  roadmap: any;
  className?: string;
}

function RoadmapCard({ roadmap, className }: RoadmapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg group ${
        className || ""
      }`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={roadmap.thumbnailUrl}
          alt={roadmap.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {roadmap.courses && roadmap.courses.length > 0 && (
          <span className="absolute bottom-2 right-2 bg-black dark:bg-white bg-opacity-80 dark:bg-opacity-90 text-white dark:text-black text-xs px-2 py-1 font-medium tracking-wide transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:bg-opacity-90">
            {roadmap.courses.length} curso
            {roadmap.courses.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-medium text-black dark:text-white mb-2 uppercase tracking-wide transition-colors duration-300 ease-out group-hover:text-gray-800 dark:group-hover:text-gray-200">
          {roadmap.title}
        </h2>
        {roadmap.description && (
          <div className="mb-4">
            {isExpanded && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {roadmap.description}
                </p>
              </div>
            )}
            <button
              onClick={handleToggleDescription}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium tracking-wide transition-colors duration-200"
              aria-label={
                isExpanded ? "Ocultar información" : "Leer información"
              }
            >
              {isExpanded ? "Ocultar información" : "Leer información"}
            </button>
          </div>
        )}
        <Link
          to={`/roadmaps/${roadmap.id}/courses`}
          state={{
            id: roadmap.id,
            roadmapTitle: roadmap.title,
            roadmapDescription: roadmap.description,
            roadmapThumbnail: roadmap.thumbnailUrl,
          }}
          className="inline-block mt-auto text-xs font-medium text-black dark:text-white hover:underline tracking-wide transition-all duration-300 ease-out transform hover:translate-x-1 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label={`Ver cursos de ${roadmap.title}`}
        >
          Ver cursos
        </Link>
      </div>
    </div>
  );
}

export default RoadmapCard;
