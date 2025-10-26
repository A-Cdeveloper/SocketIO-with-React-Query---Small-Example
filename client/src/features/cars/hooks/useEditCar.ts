import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCarType } from "@shared/types";
import { editCar } from "../api/cars";

export const useEditCar = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editCarMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, car }: { id: number; car: UpdateCarType }) =>
      editCar(id, car),
    onSuccess: async (_, variables) => {
      // Remove all cars queries to force fresh fetch
      queryClient.removeQueries({ queryKey: ["cars"], exact: false });
      // Invalidate single car query
      queryClient.invalidateQueries({ queryKey: ["car", variables.id] });
    },
  });

  return { editCarMutation, isPending, error };
};
