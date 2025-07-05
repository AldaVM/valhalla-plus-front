import { useParams } from "react-router-dom";
import CoursesByUniform from "../courses/CoursesByUniform";

const UniformCoursesPage: React.FC = () => {
  const { id: uniformId } = useParams<{ id: string }>();

  if (!uniformId) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-black mb-4">Uniforme no encontrado</h1>
          <p className="text-gray-600">El ID del uniforme no es válido.</p>
        </div>
      </div>
    );
  }

  return <CoursesByUniform uniformId={uniformId} />;
};

export default UniformCoursesPage; 