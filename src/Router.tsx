import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from "./components/auth/LoginForm";
import RoadmapsPage from "./components/roadmaps/RoadmapsPage";
import RoadmapCoursesPage from "./components/roadmaps/RoadmapCoursesPage";
import CoursePage from "./components/courses/CoursePage";
import UniformsPage from "./components/uniforms/UniformsPage";
import UniformCoursesPage from "./components/uniforms/UniformCoursesPage";
import Layout from "./components/layout/Layout";
import NotFoundPage from "./components/layout/NotFoundPage";
import TermsPage from "./components/layout/TermsPage";
import PrivacyPage from "./components/layout/PrivacyPage";
import HomePage from "./components/layout/HomePage";
import UniformCourseDetailPage from "./components/uniforms/UniformCourseDetailPage";
import ContenidoPage from "./components/layout/ContenidoPage";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component to handle theme based on routes
function AppRoutes() {
  const location = useLocation();
  const { forceLightTheme, setAllowThemeToggle } = useTheme();

  useEffect(() => {
    // Public routes that should always be light theme
    const publicRoutes = ["/", "/login"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (isPublicRoute) {
      forceLightTheme();
      setAllowThemeToggle(false);
    } else {
      // Protected routes can use theme toggle
      setAllowThemeToggle(true);
    }
  }, [location.pathname, forceLightTheme, setAllowThemeToggle]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/roadmaps"
        element={
          <ProtectedRoute>
            <Layout>
              <RoadmapsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmaps/:id/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <RoadmapCoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/uniforms"
        element={
          <ProtectedRoute>
            <Layout>
              <UniformsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/uniforms/:id/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <UniformCoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/uniforms/:uniformId/courses/:courseId"
        element={
          <ProtectedRoute>
            <Layout>
              <UniformCourseDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contenido"
        element={
          <ProtectedRoute>
            <Layout>
              <ContenidoPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/terms"
        element={
          <ProtectedRoute>
            <Layout>
              <TermsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/privacy"
        element={
          <ProtectedRoute>
            <Layout>
              <PrivacyPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} /> {/* fallback 404 */}
    </Routes>
  );
}
