import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

interface LogoutConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirm = ({ isOpen, onClose }: LogoutConfirmProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Aún navegar a login incluso si hay error
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 className="text-lg font-light tracking-wide text-black dark:text-white mb-4">
          Confirmar cierre de sesión
        </h3>

        <p className="text-sm font-light text-gray-600 dark:text-gray-300 mb-6">
          ¿Estás seguro de que quieres cerrar sesión? Esta acción invalidará tu sesión actual.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 py-2 px-4 border border-black dark:border-gray-400 text-sm font-light tracking-wide hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 bg-white dark:bg-gray-900 text-black dark:text-white"
            aria-label="Cancelar"
          >
            CANCELAR
          </button>
          <button
            onClick={handleConfirmLogout}
            disabled={isLoggingOut}
            className="flex-1 py-2 px-4 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="Confirmar cierre de sesión"
          >
            {isLoggingOut ? "CERRANDO..." : "CONFIRMAR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
