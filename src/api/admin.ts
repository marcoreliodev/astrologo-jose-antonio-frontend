import { api } from "../lib/api-client";
import type {
  AdminCreateUserPayload,
  AdminListUsersParams,
  AdminUpdatePasswordPayload,
  AdminUpdateRolePayload,
  AdminUpdateUserPayload,
  PaginatedUsers,
  User,
} from "../types/auth";

export async function listUsers(params: AdminListUsersParams): Promise<PaginatedUsers> {
  const { data } = await api.get<PaginatedUsers>("/admin/users", { params });
  return data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await api.get<User>(`/admin/users/${id}`);
  return data;
}

export async function createUser(payload: AdminCreateUserPayload): Promise<User> {
  const { data } = await api.post<User>("/admin/users", payload);
  return data;
}

export async function updateUser(id: string, payload: AdminUpdateUserPayload): Promise<User> {
  const { data } = await api.patch<User>(`/admin/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete<void>(`/admin/users/${id}`);
}

export async function updateUserRole(id: string, payload: AdminUpdateRolePayload): Promise<User> {
  const { data } = await api.patch<User>(`/admin/users/${id}/role`, payload);
  return data;
}

export async function updateUserPassword(
  id: string,
  payload: AdminUpdatePasswordPayload,
): Promise<void> {
  await api.patch<void>(`/admin/users/${id}/password`, payload);
}
