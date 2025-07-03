const SessionHelpModal = ({ isOpen, onClose }: SessionHelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-light tracking-wide text-black">
            Ayuda: Gestión de Sesiones
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
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

        <div className="space-y-6">
          {/* ¿Qué son las sesiones? */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              ¿Qué son las sesiones activas?
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Una sesión activa representa un dispositivo donde has iniciado
              sesión en la aplicación. Cada vez que inicias sesión desde un
              nuevo dispositivo o navegador, se crea una nueva sesión.
            </p>
          </div>

          {/* Límite de sesiones */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              ¿Por qué hay un límite de sesiones?
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              El límite de sesiones ayuda a proteger tu cuenta y garantizar un
              mejor rendimiento. Por defecto, puedes tener hasta 2 sesiones
              activas simultáneamente.
            </p>
          </div>

          {/* Cuándo aparece el modal */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              ¿Cuándo aparece el modal de sesiones?
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • Cuando intentas iniciar sesión y ya tienes el máximo de
                sesiones permitidas
              </li>
              <li>• Cuando haces clic en "Sesiones" en el menú principal</li>
              <li>
                • Cuando recibes una notificación de que estás cerca del límite
              </li>
            </ul>
          </div>

          {/* Cómo gestionar sesiones */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              ¿Cómo gestionar mis sesiones?
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>1. Ver sesiones activas:</strong> Haz clic en "Sesiones"
                en el menú principal
              </p>
              <p>
                <strong>2. Identificar dispositivos:</strong> Cada sesión
                muestra:
              </p>
              <ul className="ml-4 space-y-1">
                <li>
                  • Información del dispositivo (navegador, sistema operativo)
                </li>
                <li>• Dirección IP</li>
                <li>• Fecha y hora de creación</li>
              </ul>
              <p>
                <strong>3. Cerrar sesiones:</strong> Haz clic en "CERRAR" junto
                a la sesión que quieres eliminar
              </p>
            </div>
          </div>

          {/* Consejos de seguridad */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              Consejos de seguridad
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cierra sesiones en dispositivos que ya no uses</li>
              <li>• Si no reconoces una sesión, ciérrala inmediatamente</li>
              <li>• Usa dispositivos de confianza para iniciar sesión</li>
              <li>• Mantén tu contraseña segura y no la compartas</li>
            </ul>
          </div>

          {/* Estados de las sesiones */}
          <div>
            <h4 className="text-md font-medium text-black mb-2">
              Estados de las sesiones
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>
                  <strong>Disponible:</strong> Tienes espacio para más sesiones
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span>
                  <strong>Cerca del límite:</strong> Estás usando el 80% o más
                  de tus sesiones
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>
                  <strong>Límite alcanzado:</strong> No puedes crear más
                  sesiones
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de cerrar */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 rounded transition-colors"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionHelpModal;
