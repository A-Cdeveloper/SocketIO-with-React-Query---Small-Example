export type CarType = {
  id: number;
  car_name: string;
  brand: string;
  price: number;
  description: string;
};

export type CreateCarType = Omit<CarType, "id">;
export type UpdateCarType = Partial<Omit<CarType, "id">> & { id: number };

export type CarsResponse = {
  cars: CarType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    totalPages: number;
  };
};
