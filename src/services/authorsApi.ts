import api from "./axios";

export interface Author {
  id: string;
  name: string;
}

export async function getAuthorsApi(): Promise<Author[]> {
  const response = await api.get("/authors", { params: { limit: 10 } });
  return response.data;
} 