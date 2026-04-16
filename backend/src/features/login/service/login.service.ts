import { getUserByDocument } from "../model/login.model";
import { loginRequestDTO } from "../types/login.types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { systemActions, entityTypes } from "../../../global/types/global.types";
import { throwErrorHelper } from "../../../global/helpers/error/error.helper";
import { logActionHelper } from "../../../global/helpers/history/history.helper";

export const loginservice = async ({ document, password }: loginRequestDTO) => {

  const user = await getUserByDocument(document);

  if (user.length === 0) {
    throwErrorHelper("ERROR.LOGIN.INVALID_CREDENTIALS", 401);
  }

  const userData = user[0];

  if (userData.status !== 1) {
    throwErrorHelper("ERROR.LOGIN.USER_INACTIVE", 403);
  }

  const isValidPassword = await bcrypt.compare(password, userData.password);

  if (!isValidPassword) {
    throwErrorHelper("ERROR.LOGIN.INVALID_CREDENTIALS", 401);
  }

  await logActionHelper({
    action: systemActions.LOGIN,
    entity: entityTypes.USER,
    entityId: userData.user_id,
    description: `User ${userData.user_name} logged in`,
    userId: userData.user_id,
  });

  return generateToken(userData);
};

const generateToken = (userData: any) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throwErrorHelper("ERROR.LOGIN.SERVER_ENV_MISSING", 500);
  }
  return jwt.sign(
    {
      user_id: userData.user_id,
      role: userData.role,
      document: userData.document_id,
      user_name: userData.user_name,
    },
    secretKey as string,
    { expiresIn: "1h" },
  );
};
