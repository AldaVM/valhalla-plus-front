import api from "../axios";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  author: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  position: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  uniform: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  slugUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getCoursesApi() {
  const response = await api.get("/courses");
  return response.data;
}

export async function getCourseByIdApi(id: string) {
  const response = await api.get(`/courses/${id}`);
  return response.data;
}
