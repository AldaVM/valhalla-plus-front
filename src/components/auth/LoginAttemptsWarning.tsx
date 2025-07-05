import React from 'react';

interface LoginAttemptsWarningProps {
  remainingAttempts: number;
  maxAttempts: number;
  failedAttempts: number;
}

const LoginAttemptsWarning: React.FC<LoginAttemptsWarningProps> = ({
  remainingAttempts,
  maxAttempts,
  failedAttempts,
}) => {
  const getWarningColor = () => {
    if (remainingAttempts <= 1) return 'bg-red-50 border-red-200 text-red-800';
    if (remainingAttempts <= 2) return 'bg-orange-50 border-orange-200 text-orange-800';
    return 'bg-yellow-50 border-yellow-200 text-yellow-800';
  };

  const getWarningIcon = () => {
    if (remainingAttempts <= 1) return '🚨';
    if (remainingAttempts <= 2) return '⚠️';
    return '⚠️';
  };

  return (
    <div className={`p-4 rounded-lg border ${getWarningColor()} mb-4`}>
      <div className="flex items-start space-x-3">
        <span className="text-lg">{getWarningIcon()}</span>
        <div className="flex-1">
          <h4 className="font-medium mb-1">
            {remainingAttempts === 1 
              ? '¡Último intento disponible!' 
              : `${remainingAttempts} intentos restantes`
            }
          </h4>
          <p className="text-sm opacity-90">
            Has realizado {failedAttempts} de {maxAttempts} intentos fallidos. 
            {remainingAttempts === 1 
              ? ' Tu cuenta será bloqueada después del próximo intento fallido.'
              : ` Tu cuenta será bloqueada después de ${remainingAttempts} intentos más.`
            }
          </p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(failedAttempts / maxAttempts) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-75">
              Progreso: {failedAttempts}/{maxAttempts} intentos fallidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAttemptsWarning; 