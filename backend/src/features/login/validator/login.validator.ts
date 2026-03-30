import { z } from "zod";
import { Response, Request, NextFunction } from "express";

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    document: z.number().positive().int(),
    password: z.string().min(6).max(128),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      result:{},
      message: "ERROR.LOGIN.VALIDATION_ERROR",
    });
  } else {
    next();
  }
};

export default loginValidator;
