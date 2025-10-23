import { CarType, CreateCarType, UpdateCarType } from "../../../shared/types";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "../../data.json");

export class DataManager {
  private static async readData(): Promise<CarType[]> {
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading data file:", error);
      return [];
    }
  }

  private static async writeData(cars: CarType[]): Promise<void> {
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(cars, null, 2));
    } catch (error) {
      console.error("Error writing data file:", error);
      throw error;
    }
  }

  static async getAllCars(): Promise<CarType[]> {
    return this.readData();
  }

  static async getCarById(id: number): Promise<CarType | null> {
    const cars = await this.readData();
    return cars.find((car) => car.id === id) || null;
  }

  static async createCar(carData: CreateCarType): Promise<CarType> {
    const cars = await this.readData();
    const newId = Math.max(...cars.map((c) => c.id), 0) + 1;
    const newCar: CarType = { id: newId, ...carData };
    cars.push(newCar);
    await this.writeData(cars);
    return newCar;
  }

  static async updateCar(
    id: number,
    carData: UpdateCarType
  ): Promise<CarType | null> {
    const cars = await this.readData();
    const carIndex = cars.findIndex((car) => car.id === id);

    if (carIndex === -1) {
      return null;
    }

    cars[carIndex] = { ...cars[carIndex], ...carData };
    await this.writeData(cars);
    return cars[carIndex];
  }

  static async deleteCar(id: number): Promise<boolean> {
    const cars = await this.readData();
    const carIndex = cars.findIndex((car) => car.id === id);

    if (carIndex === -1) {
      return false;
    }

    cars.splice(carIndex, 1);
    await this.writeData(cars);
    return true;
  }
}
