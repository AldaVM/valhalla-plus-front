import { Link } from "react-router-dom";
import type { RoadmapCourseWithOrder } from "../../services/roadmaps/api";

interface RoadmapCoursesListProps {
  courses: RoadmapCourseWithOrder[];
  roadmapId: string;
}

const RoadmapCoursesList = ({ courses, roadmapId }: RoadmapCoursesListProps) => {
  return (
    <div className="space-y-4">
      {courses.map((courseItem) => (
        <div
          key={courseItem.course.id}
          className="bg-white border border-gray-200 p-4 md:p-6 hover:border-gray-300 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
            {/* Número de orden */}
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center font-medium text-base md:text-lg mb-3 md:mb-0">
              {courseItem.orderInRoadmap}
            </div>

            {/* Contenido del curso */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Título y autor */}
              <h3 className="text-base md:text-xl font-medium text-black mb-2 uppercase tracking-wide">
                {courseItem.course.title}
              </h3>
              {courseItem.course.author && (
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                  Por <span className="font-medium">{courseItem.course.author.name}</span>
                </p>
              )}

              {/* Imagen (móvil: debajo del título, md+: a la derecha) */}
              <div className="block md:hidden mb-3">
                <img
                  src={courseItem.course.thumbnailUrl}
                  alt={courseItem.course.title}
                  className="w-full h-32 object-cover"
                />
              </div>

              {/* Badges de posición, uniforme, duración */}
              <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                {courseItem.course.position && (
                  <span className="inline-block border border-gray-300 text-gray-700 text-xs px-3 py-1 font-medium">
                    {courseItem.course.position.name}
                  </span>
                )}
                {courseItem.course.uniform && (
                  <span className="inline-block border border-gray-300 text-gray-700 text-xs px-3 py-1 font-medium">
                    {courseItem.course.uniform.name}
                  </span>
                )}
                {courseItem.course.duration && (
                  <span className="inline-block border border-gray-300 text-gray-700 text-xs px-3 py-1 font-medium">
                    {courseItem.course.duration < 60
                      ? `${courseItem.course.duration} min`
                      : `${Math.floor(courseItem.course.duration / 60)}h ${courseItem.course.duration % 60}min`}
                  </span>
                )}
              </div>

              {/* Descripción */}
              {courseItem.course.description && (
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-0">
                  {courseItem.course.description}
                </p>
              )}

              {/* Botón de acción */}
              <div className="mt-auto">
                <Link
                  to={`/courses/${courseItem.course.id}`}
                  state={{ roadmapId, courseId: courseItem.course.id }}
                  className="block md:inline-flex items-center justify-center w-full md:w-auto px-4 py-2 bg-black text-white text-xs md:text-sm font-medium hover:bg-gray-800 transition-colors duration-200 text-center"
                  aria-label={`Ver curso ${courseItem.course.title}`}
                >
                  Ver curso
                </Link>
              </div>
            </div>

            {/* Imagen en md+ (a la derecha) */}
            <div className="hidden md:block flex-shrink-0 ml-4">
              <img
                src={courseItem.course.thumbnailUrl}
                alt={courseItem.course.title}
                className="w-24 h-16 object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapCoursesList;
