import { useState, useEffect } from "react";
import useAuth from "../../hooks/auth/useAuth";
import ActiveSessionsModal from "./ActiveSessionsModal";

const SessionNotification = () => {
  const { activeSessions, maxTokensAllowed } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasShownNotification, setHasShownNotification] = useState(false);

  useEffect(() => {
    if (activeSessions.length > 0 && maxTokensAllowed > 0) {
      const percentage = (activeSessions.length / maxTokensAllowed) * 100;
      const shouldShow = percentage >= 80 && !hasShownNotification;
      
      if (shouldShow) {
        setShowNotification(true);
        setHasShownNotification(true);
        
        // Ocultar notificación después de 10 segundos
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [activeSessions.length, maxTokensAllowed, hasShownNotification]);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleManageSessions = () => {
    setShowModal(true);
    setShowNotification(false);
  };

  const getNotificationType = () => {
    const percentage = (activeSessions.length / maxTokensAllowed) * 100;
    if (percentage >= 100) return "error";
    if (percentage >= 90) return "warning";
    return "info";
  };

  const getNotificationStyles = () => {
    const type = getNotificationType();
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getNotificationIcon = () => {
    const type = getNotificationType();
    switch (type) {
      case "error":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getNotificationMessage = () => {
    const percentage = (activeSessions.length / maxTokensAllowed) * 100;
    if (percentage >= 100) {
      return "Has alcanzado el límite máximo de sesiones activas.";
    } else if (percentage >= 90) {
      return "Estás muy cerca del límite de sesiones activas.";
    } else {
      return "Tienes muchas sesiones activas. Considera cerrar algunas.";
    }
  };

  if (!showNotification) return null;

  return (
    <>
      <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm ${getNotificationStyles()} dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getNotificationIcon()}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium dark:text-white">
              Sesiones Activas
            </h3>
            <p className="text-sm mt-1 dark:text-gray-200">
              {getNotificationMessage()}
            </p>
            <p className="text-sm mt-1 dark:text-gray-300">
              Sesiones: {activeSessions.length}/{maxTokensAllowed}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleManageSessions}
                className="text-sm font-medium underline hover:no-underline dark:text-blue-400"
              >
                Gestionar sesiones
              </button>
              <button
                onClick={handleCloseNotification}
                className="text-sm font-medium underline hover:no-underline dark:text-blue-400"
              >
                Cerrar
              </button>
            </div>
          </div>
          <button
            onClick={handleCloseNotification}
            className="ml-4 flex-shrink-0 dark:text-gray-400 hover:dark:text-white"
            aria-label="Cerrar notificación"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <ActiveSessionsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isLoginContext={false}
      />
    </>
  );
};

export default SessionNotification;
