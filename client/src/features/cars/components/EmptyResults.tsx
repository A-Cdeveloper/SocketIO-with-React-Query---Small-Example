import { type CarType } from "@shared/types";
import { CarIcon } from "lucide-react";

const EmptyResults = ({ cars }: { cars: CarType[] }) => {
  return cars.length === 0 ? (
    <div className="text-center py-12">
      <CarIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No cars available</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Check back later for new listings
      </p>
    </div>
  ) : null;
};

export default EmptyResults;
