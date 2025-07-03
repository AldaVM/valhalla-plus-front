import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import ActiveSessionsModal from "./ActiveSessionsModal";

const SessionLimitInfo = () => {
  const { activeSessions, maxTokensAllowed } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const currentSessions = activeSessions.length;
  const isNearLimit = currentSessions >= maxTokensAllowed * 0.8; // 80% del límite
  const isAtLimit = currentSessions >= maxTokensAllowed;

  if (currentSessions === 0) return null;

  const getStatusColor = () => {
    if (isAtLimit) return "text-red-600";
    if (isNearLimit) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusText = () => {
    if (isAtLimit) return "Límite alcanzado";
    if (isNearLimit) return "Cerca del límite";
    return "Disponible";
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-xs">
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          <span className="text-gray-600 ml-1">
            ({currentSessions}/{maxTokensAllowed})
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
          aria-label="Gestionar sesiones"
        >
          Gestionar
        </button>
      </div>

      <ActiveSessionsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isLoginContext={false}
      />
    </>
  );
};

export default SessionLimitInfo;
