import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/auth/useAuth";
import LogoutConfirm from "../auth/LogoutConfirm";
import ActiveSessionsModal from "../auth/ActiveSessionsModal";
import { getActiveSessionsApi } from "../../services/auth/api";

const Header = () => {
  const {
    user,
    isAuthenticated,
    activeSessions,
    maxTokensAllowed,
    setActiveSessions,
    setMaxTokensAllowed,
  } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Fetch sesiones activas al cargar si autenticado
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getActiveSessionsApi();
        setActiveSessions(data.sessions || []);
        setMaxTokensAllowed(data.maxTokensAllowed || 2);
      } catch (error) {
        // No hacer nada si falla
      }
    };
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated, setActiveSessions, setMaxTokensAllowed]);

  useEffect(() => {
    if (isAuthenticated && activeSessions) {
      setSessionCount(activeSessions.length);
    }
  }, [isAuthenticated, activeSessions]);

  // Cerrar drawer con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDrawer(false);
    };
    if (showDrawer) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDrawer]);

  const handleLogout = async () => {
    setShowLogoutConfirm(true);
    setShowDrawer(false);
  };

  const handleSessions = () => {
    setShowSessionsModal(true);
    setShowDrawer(false);
  };

  const getSessionStatusColor = () => {
    if (!sessionCount || !maxTokensAllowed) return "text-gray-600";
    const percentage = (sessionCount / maxTokensAllowed) * 100;
    if (percentage >= 100) return "text-red-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-green-600";
  };

  const getSessionStatusText = () => {
    if (!sessionCount || !maxTokensAllowed) return "";
    const percentage = (sessionCount / maxTokensAllowed) * 100;
    if (percentage >= 100) return "Límite alcanzado";
    if (percentage >= 80) return "Cerca del límite";
    return "Disponible";
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-black">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-black focus:outline-none">
          VALHALLA JIU JITSU +
        </h1>
        {/* Opciones desktop/tablet */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated && (
            <Link
              to="/contenido"
              className="text-sm font-medium tracking-wide text-black focus:underline focus:outline-none"
              aria-label="Contenido"
              tabIndex={0}
            >
              Contenido
            </Link>
          )}
          <Link
            to="/roadmaps"
            className="text-sm font-medium tracking-wide text-black focus:underline focus:outline-none"
            aria-label="Rutas de aprendizaje"
            tabIndex={0}
          >
            Rutas de aprendizaje
          </Link>
          <Link
            to="/uniforms"
            className="text-sm font-medium tracking-wide text-black focus:underline focus:outline-none"
            aria-label="Uniformes"
            tabIndex={0}
          >
            GI / NOGI
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="hidden md:inline-block bg-black text-white font-bold rounded px-6 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition w-auto text-center"
              aria-label="Iniciar sesión"
              tabIndex={0}
            >
              Iniciar sesión
            </Link>
          )}
          {isAuthenticated && (
            <>
              <span
                className="text-sm text-black"
                tabIndex={0}
                aria-label="Usuario conectado"
              >
                {user?.name}
              </span>
              <button
                onClick={handleSessions}
                className="text-sm font-medium text-black focus:underline focus:outline-none hover:text-gray-600 transition-colors"
                aria-label="Ver sesiones activas"
                tabIndex={0}
              >
                <div className="flex items-center gap-2">
                  <span>Sesiones</span>
                  {sessionCount !== null && maxTokensAllowed && (
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-medium ${getSessionStatusColor()}`}
                      >
                        {sessionCount}/{maxTokensAllowed}
                      </span>
                      {sessionCount > 0 && (
                        <span className={`text-xs ${getSessionStatusColor()}`}>
                          ({getSessionStatusText()})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-black focus:underline focus:outline-none hover:text-gray-600 transition-colors"
                aria-label="Cerrar sesión"
                tabIndex={0}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
        {/* Botón móvil */}
        {!isAuthenticated && (
          <Link
            to="/login"
            className="md:hidden w-full block bg-black text-white font-bold rounded px-6 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition text-center mt-2"
            aria-label="Iniciar sesión"
            tabIndex={0}
          >
            Iniciar sesión
          </Link>
        )}
        {/* Burger menu solo en móvil */}
        <button
          className="md:hidden p-2 focus:outline-none"
          aria-label="Abrir menú"
          onClick={() => setShowDrawer(true)}
          tabIndex={0}
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Drawer lateral solo móvil */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-label="Cerrar menú"
          />
          {/* Drawer */}
          <nav
            ref={drawerRef}
            className="relative z-10 ml-auto w-64 h-full bg-white border-l border-black flex flex-col p-6 focus:outline-none"
            tabIndex={0}
            aria-label="Menú lateral"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-medium text-black">Menú</span>
              <button
                onClick={() => setShowDrawer(false)}
                aria-label="Cerrar menú"
                className="p-1 focus:outline-none"
                tabIndex={0}
              >
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Link
              to="/"
              className="mb-6 text-base font-medium text-black focus:underline focus:outline-none"
              aria-label="Inicio"
              tabIndex={0}
              onClick={() => setShowDrawer(false)}
            >
              Inicio
            </Link>
            {isAuthenticated && (
              <Link
                to="/contenido"
                className="mb-6 text-base font-medium text-black focus:underline focus:outline-none"
                aria-label="Contenido"
                tabIndex={0}
                onClick={() => setShowDrawer(false)}
              >
                Contenido
              </Link>
            )}
            <Link
              to="/roadmaps"
              className="mb-6 text-base font-medium text-black focus:underline focus:outline-none"
              aria-label="Rutas de aprendizaje"
              tabIndex={0}
              onClick={() => setShowDrawer(false)}
            >
              Rutas de aprendizaje
            </Link>
            <Link
              to="/uniforms"
              className="mb-6 text-base font-medium text-black focus:underline focus:outline-none"
              aria-label="Uniformes"
              tabIndex={0}
              onClick={() => setShowDrawer(false)}
            >
              GI / NOGI
            </Link>
            {isAuthenticated && (
              <>
                <div className="mb-4 text-sm text-black">{user?.name}</div>
                <button
                  onClick={handleSessions}
                  className="mb-4 text-base font-medium text-black text-left focus:underline focus:outline-none"
                  aria-label="Ver sesiones activas"
                  tabIndex={0}
                >
                  <div className="flex flex-col">
                    <span>Sesiones</span>
                    {sessionCount !== null && maxTokensAllowed && (
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className={`text-sm font-medium ${getSessionStatusColor()}`}
                        >
                          {sessionCount}/{maxTokensAllowed}
                        </span>
                        {sessionCount > 0 && (
                          <span
                            className={`text-xs ${getSessionStatusColor()}`}
                          >
                            ({getSessionStatusText()})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium text-black text-left focus:underline focus:outline-none"
                  aria-label="Cerrar sesión"
                  tabIndex={0}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>
        </div>
      )}
      {/* Modales */}
      <LogoutConfirm
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
      <ActiveSessionsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
      />
    </header>
  );
};

export default Header;
