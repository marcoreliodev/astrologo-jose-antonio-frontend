import { api } from "../lib/api-client";
import type { AstralChart, CityOption, CreateChartPayload } from "../types/charts";

export async function searchCities(place: string): Promise<CityOption[]> {
  const { data } = await api.get<CityOption[]>("/charts/cities", {
    params: { place },
  });
  return data;
}

export async function createChart(payload: CreateChartPayload): Promise<AstralChart> {
  const { data } = await api.post<AstralChart>("/charts", payload);
  return data;
}

export async function listCharts(): Promise<AstralChart[]> {
  const { data } = await api.get<AstralChart[]>("/charts");
  return data;
}

export async function getChart(id: string): Promise<AstralChart> {
  const { data } = await api.get<AstralChart>(`/charts/${id}`);
  return data;
}

export async function deleteChart(id: string): Promise<void> {
  await api.delete<void>(`/charts/${id}`);
}

// --- Área administrativa ---

export async function listAllCharts(): Promise<AstralChart[]> {
  const { data } = await api.get<AstralChart[]>("/admin/charts");
  return data;
}

export async function listChartsByUser(userId: string): Promise<AstralChart[]> {
  const { data } = await api.get<AstralChart[]>(`/admin/charts/user/${userId}`);
  return data;
}

export async function getChartAdmin(id: string): Promise<AstralChart> {
  const { data } = await api.get<AstralChart>(`/admin/charts/${id}`);
  return data;
}

export async function deleteChartAdmin(id: string): Promise<void> {
  await api.delete<void>(`/admin/charts/${id}`);
}
