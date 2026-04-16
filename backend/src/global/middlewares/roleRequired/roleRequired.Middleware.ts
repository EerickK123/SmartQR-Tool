import { Response, Request, NextFunction } from "express";

export const roleRequiredMiddleware = (roleLevelRequired: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
        if (!user) {
            return res.status(401).json({
                success: false,
                result: {},
                message: "ERROR.AUTH.MISSING_USER",
            });
        }

        if (user.role >= roleLevelRequired) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                result: {},
                message: "ERROR.AUTH.UNAUTHORIZED",
            });
        }

    } catch (error) {
      return res.status(401).json({
        success: false,
        result: {},
        message: "ERROR.AUTH.UNEXPECTED_ERROR",
      });
    }
  };
};
