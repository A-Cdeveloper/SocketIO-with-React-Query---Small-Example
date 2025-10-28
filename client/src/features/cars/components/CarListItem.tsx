import { memo } from "react";
import { priceFormat } from "@/lib/utils";
import navigationRoutes from "@/providers/router/routes";
import type { CarType } from "@shared/types";
import { Link } from "react-router";

const CarListItem = ({ car }: { car: CarType }) => {
  return (
    <Link
      to={navigationRoutes.car.path.replace(":id", car.id.toString())}
      aria-label={`View ${car.car_name}`}
      data-testid="car-list-item"
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{car.car_name}</h3>
            <p
              className="text-gray-600 dark:text-gray-400"
              data-testid="car-brand"
            >
              {car.brand}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-2xl font-bold text-primary"
              data-testid="car-price"
            >
              {priceFormat(car.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(CarListItem);
