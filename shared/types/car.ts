export type CarType = {
  id: number;
  car_name: string;
  brand: string;
  price: number;
};

export type CreateCarType = Omit<CarType, "id">;
export type UpdateCarType = Partial<Omit<CarType, "id">> & { id: number };
