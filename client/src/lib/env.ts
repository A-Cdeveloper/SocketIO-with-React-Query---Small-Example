import { z } from "zod";

const envSchema = z.object({
  VITE_REST_API_URL: z.string(),
  VITE_SOCKET_URL: z.string(),
});

export const env = envSchema.parse({
  VITE_REST_API_URL: import.meta.env.VITE_REST_API_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
});
