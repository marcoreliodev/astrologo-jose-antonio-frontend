export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiErrorBody {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  acceptedTerms: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// --- Área administrativa ---

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminListUsersParams {
  page: number;
  limit: number;
}

export interface AdminCreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AdminUpdateUserPayload {
  name: string;
  email: string;
  phone: string;
}

export interface AdminUpdateRolePayload {
  role: UserRole;
}

export interface AdminUpdatePasswordPayload {
  password: string;
}
