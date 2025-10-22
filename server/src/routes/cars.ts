import { Router, Request, Response } from "express";
import { DataManager } from "../utils/dataManager";
import { CreateCar, UpdateCar } from "@shared/types";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/cars - Vrati sve automobile
router.get("/", async (req: Request, res: Response) => {
  try {
    const cars = await DataManager.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/cars/:id - Vrati jedan auto
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid car ID" });
    }

    const car = await DataManager.getCarById(id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/cars - Dodaj novi auto (AUTH REQUIRED)
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const carData: CreateCar = req.body;

    // Validacija
    if (
      !carData.car_name ||
      !carData.brand ||
      typeof carData.price !== "number"
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCar = await DataManager.createCar(carData);
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/cars/:id - Ažuriraj auto (AUTH REQUIRED)
router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid car ID" });
    }

    const carData: UpdateCar = { id, ...req.body };
    const updatedCar = await DataManager.updateCar(id, carData);

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/cars/:id - Obriši auto (AUTH REQUIRED)
router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid car ID" });
      }

      const deleted = await DataManager.deleteCar(id);
      if (!deleted) {
        return res.status(404).json({ error: "Car not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
