import { Request as ExpressRequest, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../configs";

interface Request extends ExpressRequest {
  user: { userId: string } | undefined;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(token, config.secret);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json({ message: error.message || "Authentication failed" });
  }
}
