import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "../api/cars";
import type { CarType } from "@shared/types";

export const useInfiniteCars = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam = 1 }) => getCars(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all cars from all pages
  const allCars: CarType[] = data?.pages.flatMap((page) => page.cars) ?? [];

  return {
    cars: allCars,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
