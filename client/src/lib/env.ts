import { z } from "zod";

const envSchema = z.object({
  VITE_REST_API_URL: z.string().url(),
});

export const env = envSchema.parse({
  VITE_REST_API_URL: import.meta.env.VITE_REST_API_URL,
});
