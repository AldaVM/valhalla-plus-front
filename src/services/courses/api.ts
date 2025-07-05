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
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedCoursesResponse {
  courses: Course[];
  meta: PaginationMeta;
  nextPageUrl?: string;
}

export async function getCoursesApi() {
  const response = await api.get("/courses");
  return response.data;
}

export async function getCourseByIdApi(id: string) {
  const response = await api.get(`/courses/${id}`);
  return response.data;
}

export async function getCoursesByUniformIdApi(
  uniformId: string,
  page: number = 1,
  limit: number = 12,
  authorId?: string | null,
  positionId?: string | null
): Promise<PaginatedCoursesResponse> {
  const params: any = { page, limit };

  if (authorId) {
    params.authorId = authorId;
  }

  if (positionId) {
    params.positionId = positionId;
  }

  console.log("API Call - URL:", `/courses/uniform/${uniformId}`);
  console.log("API Call - Params:", params);

  const response = await api.get(`/courses/uniform/${uniformId}`, {
    params,
  });
  return response.data;
}
