import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useInfiniteCars } from "../hooks/useCars";
import EmptyResults from "@/components/layout/EmptyResults";
import ErrorResults from "@/components/layout/ErrorResults";

const AllCars = () => {
  const {
    cars,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCars();
  const loadMoreRef = useInfiniteScroll(
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  );

  if (isLoading) return <Spinner />;
  if (error) return <ErrorResults message={error.message} />;
  if (!cars || cars.length === 0)
    return <EmptyResults type="cars" message="Try again later" />;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of premium vehicles
        </p>
      </div>
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
    </>
  );
};

export default AllCars;
