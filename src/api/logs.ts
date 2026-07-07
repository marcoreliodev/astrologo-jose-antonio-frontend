import { api } from "../lib/api-client";
import type { LogEntry } from "../types/logs";

export async function listLogs(limit: number): Promise<LogEntry[]> {
  const { data } = await api.get<LogEntry[]>("/admin/logs", { params: { limit } });
  return data;
}

export async function clearLogs(): Promise<void> {
  await api.delete<void>("/admin/logs");
}
