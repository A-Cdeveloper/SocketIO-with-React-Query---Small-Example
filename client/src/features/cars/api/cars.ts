import type { CarsResponse, CarType, UpdateCarType } from "@shared/types";
import { env } from "@/lib/env";
import type { AddCarForm } from "../schemas/car";
import { apiFetch } from "@/lib/apiClient";

const getAuthHeaders = () => {
  const authStorage = localStorage.getItem("auth-storage")
    ? JSON.parse(localStorage.getItem("auth-storage") || "{}").state
    : null;

  return {
    "Content-Type": "application/json",
    ...(authStorage?.token && { Authorization: `Bearer ${authStorage.token}` }),
  };
};

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
  const response = await apiFetch(`${env.VITE_REST_API_URL}/cars`, {
    method: "POST",
    headers: getAuthHeaders(),
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
  const response = await apiFetch(`${env.VITE_REST_API_URL}/cars/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(car),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await apiFetch(`${env.VITE_REST_API_URL}/cars/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
};
