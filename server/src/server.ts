import { config } from "dotenv";
import path from "path";

// Load .env or .env.production based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
config({ path: path.join(__dirname, `../../${envFile}`) });

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import carsRouter from "./routes/cars";
import authRouter from "./routes/auth";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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

// Export io instance for use in routes
export { io };

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚗 Server running on http://localhost:${PORT}`);
  console.log(`🚙 Cars API: http://localhost:${PORT}/api/cars`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🔌 Socket.IO ready for connections`);
});
