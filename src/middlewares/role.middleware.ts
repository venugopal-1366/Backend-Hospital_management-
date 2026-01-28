import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";


interface JwtUser {
  role?: string;
}


export const roleMiddleware =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user as JwtUser | undefined;

    if (!user || !user.role) {
      res.status(403).json({ message: "User role not found" });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    next();
  };
