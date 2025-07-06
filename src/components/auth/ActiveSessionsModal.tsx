import { useState, useEffect } from "react";
import {
  getActiveSessionsApi,
  removeSessionByIdApi,
  getActiveSessionsByEmailApi,
  removeSessionByIdWithCredentialsApi
} from "../../services/auth/api";
import useAuth from "../../hooks/auth/useAuth";
import SessionHelpModal from "./SessionHelpModal";

interface Session {
  id: string;
  deviceInfo: string;
  ipAddress: string;
  createdAt: string;
}

interface ActiveSessionsData {
  sessions: Session[];
  totalSessions: number;
  maxTokensAllowed: number;
}

interface ActiveSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoginContext?: boolean;
  onRetryLogin?: () => void;
  loginCredentials?: { email: string; password: string } | null;
}

const ActiveSessionsModal = ({
  isOpen,
  onClose,
  isLoginContext = false,
  onRetryLogin,
  loginCredentials,
}: ActiveSessionsModalProps) => {
  const { sessionLimitError, activeSessions, maxTokensAllowed } = useAuth();
  const [sessionsData, setSessionsData] = useState<ActiveSessionsData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closingSession, setClosingSession] = useState<string | null>(null);
  const [canRetryLogin, setCanRetryLogin] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isLoginContext && loginCredentials) {
        // En contexto de login, usar credenciales para obtener sesiones
        fetchActiveSessionsWithCredentials();
      } else if (isLoginContext && activeSessions.length > 0) {
        // Usar datos del contexto si estamos en login
        setSessionsData({
          sessions: activeSessions,
          totalSessions: activeSessions.length,
          maxTokensAllowed,
        });
      } else {
        fetchActiveSessions();
      }
    }
  }, [isOpen, isLoginContext, activeSessions, maxTokensAllowed, loginCredentials]);

  useEffect(() => {
    // Verificar si se puede reintentar login
    if (sessionsData && isLoginContext) {
      const availableSlots =
        sessionsData.maxTokensAllowed - sessionsData.sessions.length;
      setCanRetryLogin(availableSlots > 0);
    }
  }, [sessionsData, isLoginContext]);

  const fetchActiveSessionsWithCredentials = async () => {
    if (!loginCredentials) return;
    
    setLoading(true);
    setError("");
    try {
      const data = await getActiveSessionsByEmailApi(
        loginCredentials.email,
        loginCredentials.password
      );
      setSessionsData(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar las sesiones");
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveSessions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getActiveSessionsApi();
      setSessionsData(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError(
          "No tienes permisos para ver las sesiones. Inicia sesión primero."
        );
      } else {
        setError(err.response?.data?.message || "Error al cargar las sesiones");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSession = async (sessionId: string) => {
    setClosingSession(sessionId);
    try {
      if (isLoginContext && loginCredentials) {
        // En contexto de login, usar credenciales
        await removeSessionByIdWithCredentialsApi(
          sessionId,
          loginCredentials.email,
          loginCredentials.password
        );
        // Recargar las sesiones después de cerrar una
        await fetchActiveSessionsWithCredentials();
      } else {
        // Usuario autenticado, usar token
        await removeSessionByIdApi(sessionId);
        await fetchActiveSessions();
      }
    } catch (error) {
      console.error("Error closing session:", error);
      setError("Error al cerrar la sesión");
    } finally {
      setClosingSession(null);
    }
  };

  const handleRetryLogin = () => {
    if (onRetryLogin) {
      onRetryLogin();
    }
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeviceIcon = (deviceInfo: string) => {
    const lowerInfo = deviceInfo.toLowerCase();
    if (
      lowerInfo.includes("mobile") ||
      lowerInfo.includes("android") ||
      lowerInfo.includes("iphone")
    ) {
      return "📱";
    } else if (lowerInfo.includes("tablet") || lowerInfo.includes("ipad")) {
      return "📱";
    } else if (lowerInfo.includes("windows")) {
      return "💻";
    } else if (lowerInfo.includes("mac") || lowerInfo.includes("ios")) {
      return "🍎";
    } else {
      return "🖥️";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light tracking-wide text-black dark:text-white">
              {isLoginContext
                ? "Límite de Sesiones Alcanzado"
                : "Sesiones Activas"}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelpModal(true)}
                className="text-gray-400 hover:text-black dark:hover:text-white dark:text-gray-300 transition-colors"
                aria-label="Ayuda"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-black dark:hover:text-white dark:text-gray-300 transition-colors"
                aria-label="Cerrar"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mensaje de error de límite de sesiones */}
          {isLoginContext && sessionLimitError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded">
              <p className="text-sm text-red-600 dark:text-red-300 font-medium mb-2">
                No puedes iniciar sesión
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">{sessionLimitError}</p>
              <p className="text-sm text-red-600 dark:text-red-300 mt-2">
                Cierra una sesión existente para poder iniciar sesión
                en este dispositivo.
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto mb-2"></div>
              <p className="text-sm font-light text-gray-600 dark:text-gray-300">
                Cargando sesiones...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded">
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          {sessionsData && (
            <>
              <div className="mb-4 p-3 border border-black dark:border-gray-400 rounded bg-white dark:bg-gray-800">
                <p className="text-sm text-black dark:text-white">
                  <strong>Sesiones activas:</strong>{" "}
                  {sessionsData.sessions.length} de{" "}
                  {sessionsData.maxTokensAllowed} permitidas
                </p>
                {isLoginContext && (
                  <p className="text-sm text-black dark:text-white mt-1">
                    Debes cerrar al menos una sesión para poder iniciar sesión
                    aquí.
                  </p>
                )}
              </div>

              {sessionsData.sessions.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center py-4">
                  No hay sesiones activas
                </p>
              ) : (
                <div className="space-y-3 mb-6">
                  {sessionsData.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 border border-black dark:border-gray-400 rounded bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getDeviceIcon(session.deviceInfo)}
                            </span>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {session.deviceInfo}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            IP: {session.ipAddress}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Creada: {formatDate(session.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCloseSession(session.id)}
                          disabled={closingSession === session.id}
                          className="ml-3 px-3 py-1 text-xs bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={`Cerrar sesión ${session.deviceInfo}`}
                        >
                          {closingSession === session.id
                            ? "CERRANDO..."
                            : "CERRAR"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Botones de acción en contexto de login */}
              {isLoginContext && (
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    CANCELAR
                  </button>
                  {canRetryLogin && onRetryLogin && (
                    <button
                      onClick={handleRetryLogin}
                      className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      REINTENTAR LOGIN
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de ayuda */}
      <SessionHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </>
  );
};

export default ActiveSessionsModal;
