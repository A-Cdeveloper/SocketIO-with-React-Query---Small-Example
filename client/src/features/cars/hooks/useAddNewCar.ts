import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddCarForm } from "../schemas/car";
import { addNewCar } from "../api/cars";

export const useAddNewCar = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addNewCarMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (car: AddCarForm) => addNewCar(car),
    onSuccess: async () => {
      // Remove all cars queries to force fresh fetch
      queryClient.removeQueries({ queryKey: ["cars"], exact: false });
    },
  });

  return { addNewCarMutation, isPending, error };
};
