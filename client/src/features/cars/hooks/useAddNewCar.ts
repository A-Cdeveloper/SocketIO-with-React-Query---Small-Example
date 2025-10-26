import { useMutation } from "@tanstack/react-query";
import type { AddCarForm } from "../schemas/car";
import { addNewCar } from "../api/cars";

export const useAddNewCar = () => {
  const {
    mutate: addNewCarMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (car: AddCarForm) => addNewCar(car),
  });

  return { addNewCarMutation, isPending, error };
};
