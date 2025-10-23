import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "../api/cars";
import type { CarType } from "@shared/types";

export const useCars = () => {
  const { data, isPending, error } = useQuery<CarType[], Error>({
    queryKey: ["cars"],
    queryFn: getAllCars,
  });
  return { data, isPending, error };
};
