import { post, setAccessToken } from "./client";
import {
  loginResponseSchema,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
} from "@/lib/schemas";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const raw = await post<LoginResponse>("/api/login", data);
  const response = loginResponseSchema.parse(raw);
  setAccessToken(response.token);
  return response;
}

export async function register(data: RegisterRequest): Promise<void> {
  await post<void>("/api/users", data);
}
