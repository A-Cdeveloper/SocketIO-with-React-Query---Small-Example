import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "../api/cars";

const useDeleteCar = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCarMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: number) => deleteCar(id),
    onSuccess: async () => {
      // Remove all cars queries to force fresh fetch
      queryClient.removeQueries({ queryKey: ["cars"] });
    },
  });

  return { deleteCarMutation, isPending, error };
};

export default useDeleteCar;
