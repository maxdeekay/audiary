import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters.")
    .max(12, "Username must be at most 12 characters."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters.")
    .max(12, "Username must be at most 12 characters."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
