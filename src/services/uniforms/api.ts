import api from "../axios";
import type { Course } from "../courses/api";

export interface Uniform {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  slugUrl: string | null;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UniformCourseWithNeighbors {
  course: Course | null;
  previous: Course | null;
  next: Course | null;
}

export async function getUniformsApi(): Promise<Uniform[]> {
  const response = await api.get("/uniforms");
  return response.data;
}

export async function getUniformCourseWithNeighborsApi(
  uniformId: string,
  courseId: string,
  filters?: { authorId?: string; positionId?: string }
): Promise<UniformCourseWithNeighbors> {
  const params = { ...filters };
  const response = await api.get(
    `/uniforms/${uniformId}/course/${courseId}`,
    { params }
  );
  return response.data;
}
