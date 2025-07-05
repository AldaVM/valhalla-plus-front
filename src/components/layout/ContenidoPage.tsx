import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRoadmapsApi } from "../../services/roadmaps/api";
import { getUniformsApi, type Uniform } from "../../services/uniforms/api";
import {
  getCoursesByUniformIdApi,
  type PaginatedCoursesResponse,
} from "../../services/courses/api";
import RoadmapCard from "../roadmaps/RoadmapCard";
import CourseCard from "../courses/CourseCard";

const PAGE_SIZE = 20;

const ContenidoPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [uniforms, setUniforms] = useState<Uniform[]>([]);
  const [gi, setGi] = useState<Uniform | null>(null);
  const [nogi, setNogi] = useState<Uniform | null>(null);
  const [giCourses, setGiCourses] = useState<PaginatedCoursesResponse | null>(
    null
  );
  const [nogiCourses, setNogiCourses] =
    useState<PaginatedCoursesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [giLoading, setGiLoading] = useState(false);
  const [nogiLoading, setNogiLoading] = useState(false);
  const giSliderRef = useRef<HTMLDivElement>(null);
  const nogiSliderRef = useRef<HTMLDivElement>(null);
  const roadmapsSliderRef = useRef<HTMLDivElement>(null);
  const [giHasScrolled, setGiHasScrolled] = useState(false);
  const [nogiHasScrolled, setNogiHasScrolled] = useState(false);
  const [giAtEnd, setGiAtEnd] = useState(false);
  const [nogiAtEnd, setNogiAtEnd] = useState(false);
  const [roadmapsHasScrolled, setRoadmapsHasScrolled] = useState(false);
  const [roadmapsAtEnd, setRoadmapsAtEnd] = useState(false);

  // Primero obtener uniformes y roadmaps
  useEffect(() => {
    const fetchUniformsAndRoadmaps = async () => {
      setLoading(true);
      setError(null);
      try {
        const [roadmapsData, uniformsData] = await Promise.all([
          getRoadmapsApi(),
          getUniformsApi(),
        ]);
        setRoadmaps(roadmapsData);
        setUniforms(uniformsData);
        // Buscar NOGI primero
        const nogiUniform = uniformsData.find((u) =>
          u.name.toLowerCase().includes("nogi")
        );
        // Buscar GI: incluye 'gi' pero NO incluye 'nogi'
        const giUniform = uniformsData.find(
          (u) =>
            u.name.toLowerCase().includes("gi") &&
            !u.name.toLowerCase().includes("nogi")
        );
        setGi(giUniform || null);
        setNogi(nogiUniform || null);
      } catch (err) {
        setError("Error al cargar el contenido");
      } finally {
        setLoading(false);
      }
    };
    fetchUniformsAndRoadmaps();
  }, []);

  // Cargar solo los primeros 20 cursos GI
  useEffect(() => {
    if (!gi) return;
    setGiLoading(true);
    getCoursesByUniformIdApi(gi.id, 1, PAGE_SIZE)
      .then(setGiCourses)
      .catch(() => setGiCourses(null))
      .finally(() => setGiLoading(false));
  }, [gi]);

  // Cargar solo los primeros 20 cursos NOGI
  useEffect(() => {
    if (!nogi) return;
    setNogiLoading(true);
    getCoursesByUniformIdApi(nogi.id, 1, PAGE_SIZE)
      .then(setNogiCourses)
      .catch(() => setNogiCourses(null))
      .finally(() => setNogiLoading(false));
  }, [nogi]);

  // Función para hacer scroll horizontal en el slider
  const handleSliderScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
    setHasScrolled: (v: boolean) => void,
    setAtEnd: (v: boolean) => void
  ) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => {
        if (!ref.current) return;
        const { scrollLeft, clientWidth, scrollWidth } = ref.current;
        if (scrollLeft <= 1) {
          setHasScrolled(false);
        } else {
          setHasScrolled(true);
        }
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          setAtEnd(true);
        } else {
          setAtEnd(false);
        }
      }, 300); // espera a que termine el scroll
    }
  };

  // También actualizar el estado al hacer scroll manual (por si el usuario arrastra)
  const handleSliderManualScroll = (
    ref: React.RefObject<HTMLDivElement>,
    setHasScrolled: (v: boolean) => void,
    setAtEnd: (v: boolean) => void
  ) => {
    if (!ref.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = ref.current;
    if (scrollLeft <= 1) {
      setHasScrolled(false);
    } else {
      setHasScrolled(true);
    }
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      setAtEnd(true);
    } else {
      setAtEnd(false);
    }
  };

  // Ocultar scrollbars con CSS
  const sliderClass =
    "flex gap-4 overflow-x-auto overflow-y-hidden overflow-x-hidden pb-2 scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth snap-x snap-mandatory";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
        <div className="text-gray-600">Cargando contenido...</div>
      </div>
    );
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-12 py-8">
      {/* Rutas de aprendizaje */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/roadmaps"
            className="text-lg sm:text-xl font-bold uppercase tracking-wide text-black hover:underline"
          >
            Rutas de aprendizaje
          </Link>
          <Link
            to="/roadmaps"
            className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
          >
            Ver todo
          </Link>
        </div>
        <div className="relative">
          {/* Flecha izquierda solo si no está al inicio */}
          {roadmaps.length > 0 && roadmapsHasScrolled && (
            <button
              onClick={() => handleSliderScroll(roadmapsSliderRef, "left", setRoadmapsHasScrolled, setRoadmapsAtEnd)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
              aria-label="Anterior roadmap"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {/* Flecha derecha solo si no está al final */}
          {roadmaps.length > 0 && !roadmapsAtEnd && (
            <button
              onClick={() => handleSliderScroll(roadmapsSliderRef, "right", setRoadmapsHasScrolled, setRoadmapsAtEnd)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
              aria-label="Siguiente roadmap"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <div
            ref={roadmapsSliderRef}
            className={sliderClass}
            onScroll={() => handleSliderManualScroll(roadmapsSliderRef, setRoadmapsHasScrolled, setRoadmapsAtEnd)}
          >
            {roadmaps.slice(0, 20).map((roadmap: any) => (
              <div key={roadmap.id} className="snap-center min-w-[90vw] sm:min-w-[260px] max-w-xs flex-shrink-0 h-[400px]">
                <RoadmapCard roadmap={roadmap} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GI Slider */}
      {gi && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <Link
              to={`/uniforms/${gi.id}/courses`}
              className="text-lg sm:text-xl font-bold uppercase tracking-wide text-black hover:underline"
            >
              {gi.name}
            </Link>
            <Link
              to={`/uniforms/${gi.id}/courses`}
              className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
            >
              Ver todo
            </Link>
          </div>
          <div className="relative">
            {/* Flecha izquierda solo si no está al inicio */}
            {giCourses && giCourses.courses.length > 0 && giHasScrolled && (
              <button
                onClick={() =>
                  handleSliderScroll(
                    giSliderRef,
                    "left",
                    setGiHasScrolled,
                    setGiAtEnd
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
                aria-label={`Anterior ${gi.name}`}
              >
                <svg
                  className="w-6 h-6"
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
              </button>
            )}
            {/* Flecha derecha solo si no está al final */}
            {giCourses && giCourses.courses.length > 0 && !giAtEnd && (
              <button
                onClick={() =>
                  handleSliderScroll(
                    giSliderRef,
                    "right",
                    setGiHasScrolled,
                    setGiAtEnd
                  )
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
                aria-label={`Siguiente ${gi.name}`}
              >
                <svg
                  className="w-6 h-6"
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
            )}
            <div
              ref={giSliderRef}
              className={sliderClass}
              onScroll={() =>
                handleSliderManualScroll(
                  giSliderRef,
                  setGiHasScrolled,
                  setGiAtEnd
                )
              }
            >
              {giLoading ? (
                <div className="flex items-center justify-center w-full py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
              ) : giCourses && giCourses.courses.length > 0 ? (
                giCourses.courses.map((course) => (
                  <div
                    key={course.id}
                    className="snap-center min-w-[90vw] sm:min-w-[260px] max-w-xs flex-shrink-0 h-[400px]"
                  >
                    <CourseCard
                      course={course}
                      linkTo={`/uniforms/${gi.id}/courses/${course.id}`}
                      linkState={{ uniformId: gi.id, courseId: course.id }}
                      className="h-full"
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 py-8 w-full text-center">
                  Contenido no disponible para {gi.name}.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NOGI Slider */}
      {nogi && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <Link
              to={`/uniforms/${nogi.id}/courses`}
              className="text-lg sm:text-xl font-bold uppercase tracking-wide text-black hover:underline"
            >
              {nogi.name}
            </Link>
            <Link
              to={`/uniforms/${nogi.id}/courses`}
              className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
            >
              Ver todo
            </Link>
          </div>
          <div className="relative">
            {/* Flecha izquierda solo si no está al inicio */}
            {nogiCourses &&
              nogiCourses.courses.length > 0 &&
              nogiHasScrolled && (
                <button
                  onClick={() =>
                    handleSliderScroll(
                      nogiSliderRef,
                      "left",
                      setNogiHasScrolled,
                      setNogiAtEnd
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
                  aria-label={`Anterior ${nogi.name}`}
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              )}
            {/* Flecha derecha solo si no está al final */}
            {nogiCourses && nogiCourses.courses.length > 0 && !nogiAtEnd && (
              <button
                onClick={() =>
                  handleSliderScroll(
                    nogiSliderRef,
                    "right",
                    setNogiHasScrolled,
                    setNogiAtEnd
                  )
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-black hover:text-white text-black rounded-full p-2 shadow transition-colors"
                aria-label={`Siguiente ${nogi.name}`}
              >
                <svg
                  className="w-6 h-6"
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
            )}
            <div
              ref={nogiSliderRef}
              className={sliderClass}
              onScroll={() =>
                handleSliderManualScroll(
                  nogiSliderRef,
                  setNogiHasScrolled,
                  setNogiAtEnd
                )
              }
            >
              {nogiLoading ? (
                <div className="flex items-center justify-center w-full py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
              ) : nogiCourses && nogiCourses.courses.length > 0 ? (
                nogiCourses.courses.map((course) => (
                  <div
                    key={course.id}
                    className="snap-center min-w-[90vw] sm:min-w-[260px] max-w-xs flex-shrink-0 h-[400px]"
                  >
                    <CourseCard
                      course={course}
                      linkTo={`/uniforms/${nogi.id}/courses/${course.id}`}
                      linkState={{ uniformId: nogi.id, courseId: course.id }}
                      className="h-full"
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 py-8 w-full text-center">
                  Contenido no disponible para {nogi.name}.
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContenidoPage;
