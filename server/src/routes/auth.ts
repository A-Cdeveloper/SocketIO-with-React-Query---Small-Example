import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import { UserType, LoginRequest, AuthResponse } from "../../../shared/types";
import { generateToken } from "../middleware/auth";

const router = Router();
const USERS_FILE = path.join(__dirname, "../../users.json");

// Helper functions
const readUsers = async (): Promise<UserType[]> => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    const response: AuthResponse = {
      user: userWithoutPassword,
      token,
    };

    res.json(response);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
