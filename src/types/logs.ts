/**
 * Níveis de log no formato Pino.
 * 10 trace, 20 debug, 30 info, 40 warn, 50 error, 60 fatal.
 */
export type PinoLevel = 10 | 20 | 30 | 40 | 50 | 60;

export interface LogRequestInfo {
  id?: number;
  method?: string;
  url?: string;
  query?: Record<string, string>;
  params?: { path?: string[] };
  headers?: Record<string, string>;
  remoteAddress?: string;
  remotePort?: number;
}

export interface LogResponseInfo {
  statusCode?: number;
  headers?: Record<string, string>;
}

export interface LogEntry {
  level: PinoLevel;
  time: number;
  pid?: number;
  hostname?: string;
  context?: string;
  msg?: string;
  req?: LogRequestInfo;
  res?: LogResponseInfo;
  responseTime?: number;
  status?: number;
  url?: string;
}
