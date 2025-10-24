import type { CarsResponse, CarType } from "@shared/types";
import { env } from "@/lib/env";

export const getCars = async (page: number = 1): Promise<CarsResponse> => {
  const response = await fetch(
    `${env.VITE_REST_API_URL}/cars?page=${page}&limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
};

export const getCarById = async (id: number): Promise<CarType> => {
  const response = await fetch(`${env.VITE_REST_API_URL}/cars/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car");
  }
  return response.json();
};
