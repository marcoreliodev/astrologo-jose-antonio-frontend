import type { LogEntry, PinoLevel } from "../types/logs";

export const PINO_LEVEL_LABEL: Record<PinoLevel, string> = {
  10: "Trace",
  20: "Debug",
  30: "Info",
  40: "Aviso",
  50: "Erro",
  60: "Fatal",
};

export function getLevelTone(level: PinoLevel): "info" | "warn" | "error" | "neutral" {
  if (level >= 50) return "error";
  if (level >= 40) return "warn";
  if (level === 30) return "info";
  return "neutral";
}

/** Headers que contêm segredos e nunca devem aparecer em texto puro na tela. */
const SENSITIVE_HEADERS = new Set(["authorization", "cookie", "set-cookie"]);

export function maskSensitiveHeaders(
  headers?: Record<string, string>,
): Record<string, string> | undefined {
  if (!headers) return headers;
  const masked: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    masked[key] = SENSITIVE_HEADERS.has(key.toLowerCase()) ? maskSecret(value) : value;
  }
  return masked;
}

function maskSecret(value: string): string {
  if (value.length <= 12) return "••••••••";
  return `${value.slice(0, 10)}••••••••${value.slice(-4)}`;
}

/** Resumo de uma linha para a tabela: rota, método e descrição amigável. */
export function describeLog(entry: LogEntry): { title: string; subtitle?: string } {
  if (entry.req?.method && entry.req?.url) {
    return {
      title: `${entry.req.method} ${stripQuery(entry.req.url)}`,
      subtitle: entry.msg,
    };
  }
  if (entry.context) {
    return { title: entry.msg ?? entry.context, subtitle: entry.context };
  }
  return { title: entry.msg ?? "Log sem descrição" };
}

function stripQuery(url: string): string {
  const [path] = url.split("?");
  return path;
}

export function formatLogTime(time: number): string {
  return new Date(time).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
