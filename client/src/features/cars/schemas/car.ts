import { z } from "zod";

export const addCarSchema = z.object({
  car_name: z.string().min(1, "Car name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type AddCarForm = z.infer<typeof addCarSchema>;

export const editCarSchema = addCarSchema.partial().extend({
  id: z.number().min(1, "Car ID is required"),
});

export type EditCarForm = z.infer<typeof editCarSchema>;
