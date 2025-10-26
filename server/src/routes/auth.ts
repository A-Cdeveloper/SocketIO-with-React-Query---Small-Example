import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserType, LoginRequest, AuthResponse } from "../../../shared/types";
import { generateToken, generateRefreshToken } from "../middleware/auth";

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

const writeUsers = async (users: UserType[]) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
    throw error;
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
      return res.status(401).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const { password: _, refreshToken: __, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);
    const refreshToken = generateRefreshToken(userWithoutPassword);

    // Update user with refresh token
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, refreshToken } : u
    );
    await writeUsers(updatedUsers);

    const response: AuthResponse = {
      user: userWithoutPassword,
      token,
      refreshToken,
    };

    res.json(response);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    const users = await readUsers();

    // Verify refresh token
    const JWT_REFRESH_SECRET =
      process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret-key";

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });
    }

    // Find user with this refresh token
    const user = users.find((u) => u.refreshToken === refreshToken);

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Generate new access token
    const { password: _, refreshToken: __, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    res.json({ token });
  } catch (error) {
    console.error("Error during refresh:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
