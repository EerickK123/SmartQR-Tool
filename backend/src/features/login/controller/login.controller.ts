import { Request, Response } from "express";
import { loginservice } from "../service/login.service";
import { loginRequestDTO } from "../types/login.types";
import { createResponseHelper } from "../../../global/helpers/response/response.helper";

export const LoginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { document, password }: loginRequestDTO = req.body;
    const service = await loginservice({ document, password });
    res
      .status(200)
      .json(
        createResponseHelper(true, { token: service }, "SUCCESS.LOGIN.AUTHENTICATED"),
      );
  } catch (error: any) {
    res.status(error.status || 500).json(createResponseHelper(false, {}, error.message));
  }
};


