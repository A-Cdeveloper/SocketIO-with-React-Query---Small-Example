import type { CarType } from "@shared/types";

const CarListItem = ({ car }: { car: CarType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200">
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
  );
};

export default CarListItem;
