import { config } from "dotenv";
import path from "path";

// Load .env.development file
const envPath = path.join(__dirname, "../../.env.development");
console.log("Loading env from:", envPath);
config({ path: envPath });

import express from "express";
import cors from "cors";
import carsRouter from "./routes/cars";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cars", carsRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// 404 handler
app.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚗 Server running on http://localhost:${PORT}`);
  console.log(`🚙 Cars API: http://localhost:${PORT}/api/cars`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
});
