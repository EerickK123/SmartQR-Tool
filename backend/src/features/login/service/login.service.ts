import { validateLogin } from "../model/login.model";
import { loginRequestDTO } from "../types/login.types";
import jwt from "jsonwebtoken";

export const loginservice = async ({ document, password }: loginRequestDTO) => {
  const user = await validateLogin(document, password);
  if (!user.success) {
    return { success: false, result: {}, message: user.message };
  } else {
    const userData = user.result.user;
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return {
        success: false,
        result: {},
        message: "ERROR.LOGIN.SERVER_ENV_MISSING",
      };
    }
    const token = jwt.sign(
      {
        document: userData?.document,
        role: userData?.role,
        status: userData?.status,
        userName: userData?.name,
      },
      secretKey,
      {
        expiresIn: "1h",
      },
    );
    return {
      success: true,
      result: {
        token: token,
      },
      message: null,
    };
  }
};
