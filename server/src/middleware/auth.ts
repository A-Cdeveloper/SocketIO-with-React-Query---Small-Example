import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUserType } from "../../../shared/types";
import "dotenv/config";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUserType;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret-key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = user as AuthUserType;
    next();
  });
};

export const generateToken = (user: AuthUserType): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: AuthUserType): string => {
  return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
