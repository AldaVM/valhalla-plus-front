import React from 'react';

interface AccountBlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const AccountBlockedModal: React.FC<AccountBlockedModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        {/* Icono de bloqueo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Cuenta Bloqueada
          </h2>
        </div>

        {/* Mensaje */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            La cuenta <span className="font-medium">{email}</span> ha sido bloqueada permanentemente debido a múltiples intentos fallidos de inicio de sesión.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ Bloqueo Permanente
            </p>
            <p className="text-red-700 text-xs mt-1">
              Solo un administrador puede desbloquear tu cuenta. Contacta al soporte técnico para solicitar el desbloqueo.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            ¿Por qué se bloqueó mi cuenta?
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Se excedió el número máximo de intentos de inicio de sesión</li>
            <li>• Este es un mecanismo de seguridad para proteger tu cuenta</li>
            <li>• El bloqueo es permanente y requiere intervención administrativa</li>
            <li>• Contacta al soporte técnico para solicitar el desbloqueo</li>
          </ul>
        </div>

        {/* Botón de cerrar */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBlockedModal; 