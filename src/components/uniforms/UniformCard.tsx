import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Uniform } from "../../services/uniforms/api";

interface UniformCardProps {
  uniform: Uniform;
}

const UniformCard: React.FC<UniformCardProps> = ({ uniform }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  // Intersection Observer para lazy loading de videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const videoElement = document.querySelector(`[data-video-id="${uniform.id}"]`);
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => observer.disconnect();
  }, [uniform.id]);

  return (
    <div className="bg-white border border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg group h-full">
      <div className="relative w-full h-40 sm:h-48 lg:h-52 overflow-hidden">
        {!isVideoError ? (
          <video
            src={isInView ? uniform.videoUrl : undefined}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            muted
            loop
            autoPlay={isInView}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            playsInline
            preload={isInView ? "metadata" : "none"}
            data-video-id={uniform.id}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs">Video no disponible</p>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {!isVideoLoaded && !isVideoError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-black"></div>
          </div>
        )}

        {/* Play icon overlay */}
        {isVideoLoaded && !isVideoError && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black bg-opacity-50 rounded-full p-2 sm:p-3">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-base sm:text-lg font-medium text-black mb-2 uppercase tracking-wide transition-colors duration-300 ease-out group-hover:text-gray-800">
          {uniform.name}
        </h2>
        
        {uniform.description && (
          <div className="mb-3 sm:mb-4">
            {isExpanded && (
              <div className="mb-2">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {uniform.description}
                </p>
              </div>
            )}
            <button
              onClick={handleToggleDescription}
              className="text-xs text-gray-500 hover:text-black font-medium tracking-wide transition-colors duration-200"
              aria-label={isExpanded ? "Ocultar información" : "Leer información"}
            >
              {isExpanded ? "Ocultar información" : "Leer información"}
            </button>
          </div>
        )}
        
        <Link
          to={`/uniforms/${uniform.id}/courses`}
          state={{
            id: uniform.id,
            uniformName: uniform.name,
            uniformDescription: uniform.description,
            uniformVideoUrl: uniform.videoUrl,
          }}
          className="inline-block mt-auto text-xs font-medium text-black hover:underline tracking-wide transition-all duration-300 ease-out transform hover:translate-x-1 hover:text-gray-700"
          aria-label={`Ver cursos de ${uniform.name}`}
        >
          Ver cursos
        </Link>
      </div>
    </div>
  );
};

export default UniformCard; 