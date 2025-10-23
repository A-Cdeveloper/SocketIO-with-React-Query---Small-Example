import { Spinner } from "@/components/ui/spinner";
import { useEffect, useRef } from "react";
import { useInfiniteCars } from "../hooks/useCars";

const AllCars = () => {
  const {
    cars,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCars();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cars) return <div>No cars found</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200"
          >
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{car.car_name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{car.brand}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  ${car.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center mt-8">
          <Spinner />
        </div>
      )}
      <div ref={loadMoreRef} aria-label="Load more cars" aria-hidden={true} />

      {/* Load More Button */}
      {/* {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-primary hover:bg-primary/90"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )} */}
    </>
  );
};

export default AllCars;
