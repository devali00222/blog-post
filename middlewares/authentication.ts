import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/usersModel";
export interface AuthenticatedRequest extends Request {
  user?: IUser["id"];
}
export const authentication: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ result: "no token given" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY || "12345-67890-98760-54321"
    );
    req.user = decodedToken;
    const user = await User.findById(req.user.id);
    req.user.role = user?.role;
    req.user.username = user?.username;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export const havePremision = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role === "user") {
      return res.status(401).json({ message: "Don't have access to this" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Don't have access to this" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
