import { Request, Response } from "express";
import { loginRequestDTO, loginResponseDTO } from "../types/login.types";
import { loginservice } from "../service/login.service";


export const LoginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { document, password }: loginRequestDTO = req.body;

  if (!document || !password) {
    res.status(206).json({success: false, result: {}, message: "ERROR.LOGIN.MISSING_FIELDS" });
  } else {
    const service = await loginservice({ document, password });
    const response: loginResponseDTO = {
      success: service.success,
      result: service.result,
      message: service.message,
    };

    if (!service.success) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  }
};
