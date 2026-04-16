import { pool } from "../../../db/config/db-config";
import { UserRow } from "../types/login.types";

export const getUserByDocument = async (document: number) => {
  const query = `
    SELECT *
    FROM users
    WHERE document_id = ?
    LIMIT 1
  `;
  const [rows] = await pool.query<UserRow[]>(query, [document]);
  return rows;
};

