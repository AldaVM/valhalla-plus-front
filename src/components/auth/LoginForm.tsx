import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { loginApi, getActiveSessionsByEmailApi } from "../../services/auth/api";
import ActiveSessionsModal from "./ActiveSessionsModal";

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
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
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
      login(response.access_token, response.user);
      navigate("/roadmaps");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Credenciales incorrectas";

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
        setError(errorMessage);
      }
    }
  };

  const handleCloseSessionsModal = () => {
    setShowSessionsModal(false);
    setSessionLimitError(null);
    setError("");
    setLoginCredentials(null);
  };

  const handleRetryLogin = async () => {
    if (!loginCredentials) return;

    try {
      setError("");
      const response = await loginApi(
        loginCredentials.email,
        loginCredentials.password
      );
      login(response.access_token, response.user);
      navigate("/roadmaps");
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
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm font-light tracking-wide transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-sm font-light tracking-wide transition-colors"
                  aria-label="Contraseña"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-2 text-xs text-red-600 font-light"
                />
              </div>

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
    </div>
  );
}

export default LoginForm;
