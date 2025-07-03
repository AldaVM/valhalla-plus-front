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

export interface RoadmapCourseWithOrder {
  course: Course;
  orderInRoadmap: number;
}

export interface RoadmapCoursesListResponse {
  courses: RoadmapCourseWithOrder[];
  totalDuration: number;
  totalCourses: number;
}

export async function getRoadmapsApi() {
  const response = await api.get("/roadmaps");
  return response.data;
}

export async function getRoadmapCoursesApi(
  id: string
): Promise<RoadmapCoursesListResponse> {
  try {
    const response = await api.get(`/roadmap-courses/${id}/courses`);
    console.log("API Response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getCourseWithNeighborsApi(
  roadmapId: string,
  courseId: string
) {
  const response = await api.get(
    `/roadmap-courses/${roadmapId}/course/${courseId}`
  );
  return response.data;
}

export async function getRoadmapByIdApi(id: string) {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
}
