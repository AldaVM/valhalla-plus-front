import api from "./axios";

export interface Position {
  id: string;
  name: string;
}

export async function getPositionsApi(): Promise<Position[]> {
  const response = await api.get("/positions", { params: { limit: 10 } });
  return response.data;
} 