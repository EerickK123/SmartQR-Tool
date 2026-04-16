import { z } from "zod";
import { Response, Request, NextFunction } from "express";
import { createResponseHelper } from "../../../global/helpers/response/response.helper";

export const addUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    role: z.number().positive().int(),
    document: z.number().positive().int(),
    password: z.string().min(6).max(128),
    userName: z.string().min(3).max(128),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(
        createResponseHelper(false, {}, "ERROR.USERS.ADD.VALIDATION_ERROR"),
      );
  } else {
    next();
  }
};

export const bulkDeleteValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    bulk: z
      .array(z.number().int().positive())
      .min(1)
      .max(100)
      .refine((arr) => new Set(arr).size === arr.length),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(
        createResponseHelper(
          false,
          {},
          "ERROR.USERS.BULKDELETE.VALIDATION_ERROR",
        ),
      );
  } else {
    next();
  }
};

export const updateUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    role: z.number().positive().int(),
    document: z.number().positive().int(),
    password: z.string().min(6).max(128),
    userName: z.string().min(3).max(128), 
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(
        createResponseHelper(
          false,
          {},
          "ERROR.USERS.UPDATE.VALIDATION_ERROR",
        ),
      );
  } else {
    next();
  }
};
