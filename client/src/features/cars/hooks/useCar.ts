import { useQuery } from "@tanstack/react-query";
import { getCarById } from "../api/cars";

export const useCar = (id: number) => {
  const {
    data: car,
    isPending,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  return { car, isPending, error };
};
