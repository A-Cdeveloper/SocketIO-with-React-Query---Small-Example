import { Router, Request, Response } from "express";
import { DataManager } from "../utils/dataManager";
import { CreateCarType, UpdateCarType } from "../../../shared/types";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/cars - Vrati sve automobile sa pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const allCars = await DataManager.getAllCars();
    const cars = allCars.slice(offset, offset + limit);
    const hasNext = offset + limit < allCars.length;

    res.json({
      cars,
      pagination: {
        page,
        limit,
        total: allCars.length,
        hasNext,
        totalPages: Math.ceil(allCars.length / limit),
      },
    });
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
    const carData: CreateCarType = req.body;

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

    const carData: UpdateCarType = { id, ...req.body };
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
