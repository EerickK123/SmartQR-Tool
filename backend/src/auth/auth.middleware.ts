import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";



export const authMiddleware = (roleLevelRequired: number) => {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = await verifyAccess(req.headers.authorization);

      if (decoded.role >= roleLevelRequired) {
        req.user = decoded; 
        next();
      } else {
        return res.status(403).json({
          success: false,
          result: {},
          message: "ERROR.AUTH.NOT_AUTHORIZED",
        });
      }
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        result: {},
        message: error.message || "ERROR.AUTH.UNEXPECTED",
      });
    }
  };
};

const verifyAccess = async (authHeader: string | undefined) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("ERROR.AUTH.MISSING_TOKEN");
  }

  const token = authHeader.split(" ")[1];

  const secretKey = process.env.JWT_SECRET as string;

  try {
    return jwt.verify(token, secretKey) as any;
  } catch (err) {
    throw new Error("ERROR.AUTH.INVALID_TOKEN");
  }
};
