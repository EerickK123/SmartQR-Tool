import { pool } from "../../../db/config/db-config";
import bcrypt from "bcrypt";
import { UserRow } from "../types/login.types";

export const validateLogin = async (document: number, password: string) => {
  try {
    const query = "SELECT * FROM users WHERE document_id = ? LIMIT 1";
    const [rows] = await pool.query<UserRow[]>(query, [document]);

    if (rows.length === 0) {
      return { success: false, result: {}, message: "ERROR.LOGIN.USER_NOT_FOUND" };
    }

    const user = rows[0];

    if (user.status !== 1) {
      return { success: false, result: {}, message: "ERROR.LOGIN.USER_INACTIVE" };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, result: {}, message: "ERROR.LOGIN.INVALID_PASSWORD" };
    }

    return {
      success: true,
      result: {
        user: {
          role: user.role,
          name: user.user_name,
          document: user.document_id,
          status: user.status,
        },
      },
      message: "SUCCESS.LOGIN.AUTHENTICATED",
    };
  } catch (error) {
    console.error(error);
    return { success: false, result: {}, message: "ERROR.LOGIN.DATABASE_ERROR" };
  }
};
