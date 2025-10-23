import type { CarType } from "@shared/types";
import { env } from "@/lib/env";

export const getAllCars = async (): Promise<CarType[]> => {
  const response = await fetch(`${env.VITE_REST_API_URL}/cars`);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await response.json();
  return data;
};
