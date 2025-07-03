const SessionInfo = ({ isOpen, onClose }: SessionInfoProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-light tracking-wide text-black">
            Información sobre Sesiones
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="p-3 bg-white rounded border border-black">
            <h4 className="font-medium text-black mb-2">¿Por qué solo puedo tener una sesión?</h4>
            <p className="text-xs">
              Por seguridad, el sistema está configurado para permitir solo una sesión activa por usuario. 
              Esto evita el acceso no autorizado desde múltiples dispositivos.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-black">
            <h4 className="font-medium text-black mb-2">¿Qué pasa si intento acceder desde otro dispositivo?</h4>
            <p className="text-xs">
              Si ya tienes una sesión activa, verás un mensaje de error. 
              Puedes cerrar sesión desde el dispositivo actual o ver tus sesiones activas.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-black">
            <h4 className="font-medium text-black mb-2">¿Cómo cerrar sesión en todos los dispositivos?</h4>
            <p className="text-xs">
              Usa la opción "CERRAR TODAS LAS SESIONES" en el modal de sesiones activas 
              para cerrar sesión en todos los dispositivos simultáneamente.
            </p>
          </div>

          <div className="p-3 bg-white border border-black rounded">
            <p className="text-xs text-black">
              <strong>Consejo:</strong> Si tienes problemas para acceder, usa la opción 
              "LIMPIAR SESIONES" para eliminar completamente todas las sesiones.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors"
            aria-label="Entendido"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo; 