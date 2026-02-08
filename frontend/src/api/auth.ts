import { post, setAccessToken } from "./client";
import {
  authResponseSchema,
  type LoginRequest,
  type AuthResponse,
  type RegisterRequest,
} from "@/lib/schemas";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const raw = await post<AuthResponse>("/api/users/login", data);

  const response = authResponseSchema.parse(raw);
  console.log(response);
  setAccessToken(response.token);

  return response;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const raw = await post<AuthResponse>("/api/users/register", data);
  const response = authResponseSchema.parse(raw);
  setAccessToken(response.token);
  return response;
}
