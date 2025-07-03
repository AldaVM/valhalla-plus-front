import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from "./components/auth/LoginForm";
import RoadmapsPage from "./components/roadmaps/RoadmapsPage";
import RoadmapCoursesPage from "./components/roadmaps/RoadmapCoursesPage";
import CoursePage from "./components/courses/CoursePage";
import Layout from "./components/layout/Layout";
import NotFoundPage from "./components/layout/NotFoundPage";
import TermsPage from "./components/layout/TermsPage";
import PrivacyPage from "./components/layout/PrivacyPage";
import HomePage from "./components/layout/HomePage";

export default function Router() {
  return (
    <BrowserRouter>
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
          path="/terms"
          element={
            <Layout>
              <TermsPage />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <PrivacyPage />
            </Layout>
          }
        />
        <Route path="*" element={<NotFoundPage />} /> {/* fallback 404 */}
      </Routes>
    </BrowserRouter>
  );
}
