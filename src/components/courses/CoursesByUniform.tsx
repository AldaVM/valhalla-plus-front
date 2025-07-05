import React, { useState, useEffect } from "react";
import { getCoursesByUniformIdApi } from "../../services/courses/api";
import type { PaginatedCoursesResponse } from "../../services/courses/api";
import { getAuthorsApi } from "../../services/authorsApi";
import { getPositionsApi } from "../../services/positionsApi";
import type { Author } from "../../services/authorsApi";
import type { Position } from "../../services/positionsApi";
import CourseCard from "./CourseCard";

interface CoursesByUniformProps {
  uniformId: string;
}

const CoursesByUniform: React.FC<CoursesByUniformProps> = ({ uniformId }) => {
  const [coursesData, setCoursesData] =
    useState<PaginatedCoursesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);

  // Estados para filtros
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(false);

  const handleLoadCourses = async (page: number = 1, authorId?: string | null, positionId?: string | null) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Loading courses:", { uniformId, page, authorId, positionId });
      const data = await getCoursesByUniformIdApi(uniformId, page, 12, authorId, positionId);
      setCoursesData(data);
      setCurrentPage(page);
    } catch (err) {
      setError("Error al cargar los cursos");
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadFilters = async () => {
    setLoadingFilters(true);
    try {
      const [authorsData, positionsData] = await Promise.all([
        getAuthorsApi(),
        getPositionsApi(),
      ]);
      setAuthors(authorsData);
      setPositions(positionsData);
    } catch (err) {
      console.error("Error loading filters:", err);
    } finally {
      setLoadingFilters(false);
    }
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    setError(null);
    
    const filters = {
      uniformId,
      authorId: selectedAuthor || null,
      positionId: selectedPosition || null,
    };
    console.log("Filtros aplicados:", filters);

    try {
      console.log("Llamando a la API con filtros...");
      const result = await getCoursesByUniformIdApi(
        uniformId,
        1, // page
        12, // limit
        selectedAuthor || null,
        selectedPosition || null
      );
      console.log("Resultado de la API con filtros:", result);
      setCoursesData(result);
      setCurrentPage(1);
    } catch (err) {
      setError("Error al buscar cursos con filtros");
      console.error("Error al buscar cursos con filtros:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNextPage = () => {
    if (coursesData?.meta.hasNextPage) {
      handleLoadCourses(currentPage + 1, selectedAuthor || null, selectedPosition || null);
    }
  };

  const handlePreviousPage = () => {
    if (coursesData?.meta.hasPreviousPage) {
      handleLoadCourses(currentPage - 1, selectedAuthor || null, selectedPosition || null);
    }
  };

  // Cargar cursos cuando cambie el uniformId
  useEffect(() => {
    if (uniformId) {
      handleLoadCourses(1);
    }
  }, [uniformId]);

  // Cargar filtros al montar el componente
  useEffect(() => {
    handleLoadFilters();
  }, []);

  if (loading && !coursesData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-lg font-medium">{error}</p>
          </div>
          <button
            onClick={() => handleLoadCourses(1)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Filtro de Autor */}
          <div className="flex flex-col">
            <label
              htmlFor="author-filter"
              className="text-xs font-medium text-gray-700 mb-1"
            >
              Autor
            </label>
            <select
              id="author-filter"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
              disabled={loadingFilters}
            >
              <option value="">Todos</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Posición */}
          <div className="flex flex-col">
            <label
              htmlFor="position-filter"
              className="text-xs font-medium text-gray-700 mb-1"
            >
              Posición
            </label>
            <select
              id="position-filter"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
              disabled={loadingFilters}
            >
              <option value="">Todos</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loadingFilters || searchLoading}
              className="w-full h-[2.25rem] bg-black text-white rounded text-sm hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              {searchLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Buscando...
                </div>
              ) : (
                "Buscar"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Información de paginación */}
      {coursesData && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">
            Mostrando {coursesData.courses.length} de {coursesData.meta.total} cursos
          </div>
          <div className="text-sm text-gray-600">
            Página {coursesData.meta.page} de {coursesData.meta.totalPages}
          </div>
        </div>
      )}

      {/* Lista de cursos */}
      {searchLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Buscando cursos...</p>
          </div>
        </div>
      ) : coursesData && coursesData.courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {coursesData.courses.map((course) => (
            <div key={course.id} className="snap-center min-w-[90vw] sm:min-w-0 h-[400px]">
              <CourseCard
                course={course}
                linkTo={`/uniforms/${uniformId}/courses/${course.id}`}
                linkState={{ uniformId, courseId: course.id }}
                className="h-full"
              />
            </div>
          ))}
        </div>
      ) : coursesData && coursesData.courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
            <p className="text-gray-600 mb-6">
              {selectedAuthor || selectedPosition 
                ? "No hay cursos que coincidan con los filtros seleccionados."
                : "No hay cursos disponibles en este uniforme."
              }
            </p>
          </div>
        </div>
      ) : null}

      {/* Controles de paginación */}
      {coursesData && coursesData.meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={!coursesData.meta.hasPreviousPage || loading}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página anterior"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Página {coursesData.meta.page} de {coursesData.meta.totalPages}
            </span>
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={!coursesData.meta.hasNextPage || loading}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página siguiente"
          >
            Siguiente
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Loading indicator para paginación */}
      {loading && coursesData && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )}
    </div>
  );
};

export default CoursesByUniform;
