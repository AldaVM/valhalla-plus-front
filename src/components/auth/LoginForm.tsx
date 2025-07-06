import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import {
  loginApi,
  getActiveSessionsByEmailApi,
} from "../../services/auth/api";
import ActiveSessionsModal from "./ActiveSessionsModal";
import AccountBlockedModal from "./AccountBlockedModal";
import LoginAttemptsWarning from "./LoginAttemptsWarning";
import WelcomeModal from "./WelcomeModal";

function LoginForm() {
  const {
    login,
    setSessionLimitError,
    setActiveSessions,
    setMaxTokensAllowed,
  } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockedEmail, setBlockedEmail] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(
    null
  );
  const [maxAttempts] = useState<number>(3);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeData, setWelcomeData] = useState<{
    message: string;
    userName: string;
    response: any;
  } | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Correo invalido")
      .required("Email es obligatorio"),
    password: yup.string().required("Password es obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await loginApi(values.email, values.password);
      
      // Verificar si hay mensaje de bienvenida
      if (response.user.welcomeMessage && response.user.welcomeMessage.trim()) {
        setWelcomeData({
          message: response.user.welcomeMessage,
          userName: response.user.name || response.user.email,
          response: response,
        });
        setShowWelcomeModal(true);
      } else {
        // Si no hay mensaje de bienvenida, hacer login directamente
        login(response.access_token, response.user);
        navigate("/contenido");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Credenciales incorrectas";

      // Verificar si es un error de cuenta bloqueada
      if (
        errorMessage.includes("Account is blocked") ||
        errorMessage.includes("cuenta bloqueada") ||
        errorMessage.includes("permanently blocked")
      ) {
        setBlockedEmail(values.email);
        setShowBlockedModal(true);
        setError("Cuenta bloqueada permanentemente");
        setRemainingAttempts(null); // Limpia advertencias
        setFailedAttempts(0);
        return;
      }

      // Verificar si es un error de límite de sesiones
      if (
        errorMessage.includes("Maximum") &&
        errorMessage.includes("active sessions allowed")
      ) {
        setSessionLimitError(errorMessage);
        setError("Límite de sesiones alcanzado");

        // Guardar credenciales para reintento
        setLoginCredentials({ email: values.email, password: values.password });

        // Obtener sesiones activas usando credenciales
        try {
          const sessionsResponse = await getActiveSessionsByEmailApi(
            values.email,
            values.password
          );
          setActiveSessions(sessionsResponse.sessions || []);
          setMaxTokensAllowed(sessionsResponse.maxTokensAllowed || 2);
          setShowSessionsModal(true);
        } catch (sessionError: any) {
          console.error("Error fetching active sessions:", sessionError);
          setError("Error al cargar las sesiones activas");
        }
      } else {
        // Verificar si el mensaje contiene información sobre intentos restantes
        const attemptsMatch = errorMessage.match(/(\d+) attempts remaining/);
        if (attemptsMatch) {
          const attempts = parseInt(attemptsMatch[1]);
          setRemainingAttempts(attempts);
          setFailedAttempts(maxAttempts - attempts);
          setError(
            `Credenciales incorrectas. ${attempts} intentos restantes antes del bloqueo.`
          );
        } else {
          setError(errorMessage);
        }
      }
    }
  };

  const handleCloseSessionsModal = () => {
    setShowSessionsModal(false);
    setSessionLimitError(null);
    setError("");
    setLoginCredentials(null);
  };

  const handleCloseBlockedModal = () => {
    setShowBlockedModal(false);
    setBlockedEmail("");
    setError("");
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    // Hacer login después de cerrar el modal
    if (welcomeData) {
      login(welcomeData.response.access_token, welcomeData.response.user);
      navigate("/contenido");
    }
    setWelcomeData(null);
  };

  const handleRetryLogin = async () => {
    if (!loginCredentials) return;

    try {
      setError("");
      const response = await loginApi(
        loginCredentials.email,
        loginCredentials.password
      );
      
      // Verificar si hay mensaje de bienvenida
      if (response.user.welcomeMessage && response.user.welcomeMessage.trim()) {
        setWelcomeData({
          message: response.user.welcomeMessage,
          userName: response.user.name || response.user.email,
          response: response,
        });
        setShowWelcomeModal(true);
      } else {
        // Si no hay mensaje de bienvenida, hacer login directamente
        login(response.access_token, response.user);
        navigate("/roadmaps");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al reintentar login";
      setError(errorMessage);

      // Si sigue siendo error de sesiones, mostrar modal de nuevo
      if (
        errorMessage.includes("Maximum") &&
        errorMessage.includes("active sessions allowed")
      ) {
        setSessionLimitError(errorMessage);
        setShowSessionsModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4">
            VALHALLA JIU JITSU +
          </h1>
          <p className="text-lg font-light text-gray-600">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Login Form */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm font-light tracking-wide transition-colors bg-white text-gray-900 placeholder-gray-500"
                  aria-label="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-2 text-xs text-red-600 font-light"
                />
              </div>

              {/* Password Field */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm font-light tracking-wide transition-colors bg-white text-gray-900 placeholder-gray-500"
                  aria-label="Contraseña"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-2 text-xs text-red-600 font-light"
                />
              </div>

              {/* Warning for remaining attempts */}
              {remainingAttempts !== null &&
                !showBlockedModal &&
                remainingAttempts < maxAttempts && (
                  <LoginAttemptsWarning
                    remainingAttempts={remainingAttempts}
                    maxAttempts={maxAttempts}
                    failedAttempts={failedAttempts}
                  />
                )}

              {/* Error Message */}
              {error && (
                <div className="text-xs text-red-600 font-light text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gray-900 text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Iniciar sesión"
              >
                {isSubmitting ? "CARGANDO..." : "INICIAR SESIÓN"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs font-light tracking-wide text-gray-500">
            © 2025 VALHALLA JIU JITSU +. TODOS LOS DERECHOS RESERVADOS ALDAVM
          </p>
        </div>
      </div>

      {/* Modal de Sesiones Activas */}
      {showSessionsModal && (
        <ActiveSessionsModal
          isOpen={showSessionsModal}
          onClose={handleCloseSessionsModal}
          isLoginContext={true}
          onRetryLogin={handleRetryLogin}
          loginCredentials={loginCredentials}
        />
      )}

      {/* Modal de Cuenta Bloqueada */}
      {showBlockedModal && (
        <AccountBlockedModal
          isOpen={showBlockedModal}
          onClose={handleCloseBlockedModal}
          email={blockedEmail}
        />
      )}

      {/* Modal de Bienvenida */}
      {showWelcomeModal && welcomeData && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleCloseWelcomeModal}
          welcomeMessage={welcomeData.message}
          userName={welcomeData.userName}
        />
      )}
    </div>
  );
}

export default LoginForm;
