import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token es inválido (401), limpiar localStorage y redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Solo redirigir si no estamos ya en la página de login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    // Para errores 409 (Conflict) - sesión duplicada, no redirigir automáticamente
    if (error.response?.status === 409) {
      // Dejar que el componente maneje este error específicamente
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default api; 