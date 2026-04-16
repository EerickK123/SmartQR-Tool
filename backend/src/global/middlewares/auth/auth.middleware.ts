import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          result: {},
          message: "ERROR.AUTH.MISSING_TOKEN",
        });
      }

      const token = authHeader.split(" ")[1];

      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        return res.status(500).json({
          success: false,
          result: {},
          message: "ERROR.AUTH.SECRET_NOT_DEFINED",
        });
      }

      const decoded = jwt.verify(token, secretKey);

      if (typeof decoded !== "object" || decoded === null) {
        return res.status(401).json({
          success: false,
          result: {},
          message: "ERROR.AUTH.INVALID_TOKEN",
        });
      }

      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        result: {},
        message: "ERROR.AUTH.INVALID_TOKEN",
      });
    }
  };
};
