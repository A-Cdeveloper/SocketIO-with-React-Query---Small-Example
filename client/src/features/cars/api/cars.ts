import type { CarsResponse, CarType, UpdateCarType } from "@shared/types";
import { env } from "@/lib/env";
import type { AddCarForm } from "../schemas/car";

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

export const addNewCar = async (car: AddCarForm): Promise<CarType> => {
  const response = await fetch(`${env.VITE_REST_API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const editCar = async (
  id: number,
  car: UpdateCarType
): Promise<CarType> => {
  const response = await fetch(`${env.VITE_REST_API_URL}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
