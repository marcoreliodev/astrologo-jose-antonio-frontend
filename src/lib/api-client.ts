import axios, { AxiosError } from "axios";
import type { ApiErrorBody } from "../types/auth";

const TOKEN_KEY = "astro:token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Normaliza qualquer erro de requisição para o formato de erro da API
 * ({ statusCode, message, path, timestamp }), com um fallback genérico
 * para falhas de rede ou respostas inesperadas.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    const body = axiosError.response?.data;
    if (body?.message) return body.message;
    if (axiosError.code === "ERR_NETWORK") {
      return "Não foi possível conectar ao servidor. Verifique sua internet.";
    }
  }
  return "Algo saiu do alinhamento. Tente novamente em instantes.";
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
    }
    return Promise.reject(error);
  },
);
