export type Car = {
  id: number;
  car_name: string;
  brand: string;
  price: number;
};

export type CreateCar = Omit<Car, "id">;
export type UpdateCar = Partial<Omit<Car, "id">> & { id: number };
