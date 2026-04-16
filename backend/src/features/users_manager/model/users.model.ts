import { ResultSetHeader } from "mysql2";
import {
  readedUsersRow,
  addUserDTO,
  deletedUser,
  bulkDeleteDTO,
  updatedUserData,
} from "../types/users.types";
import { pool } from "../../../db/config/db-config";

export const getUsers = async () => {
  const query =
    "SELECT user_id, role, document_id, user_name FROM users WHERE status = ? ";
  const [rows] = await pool.query<readedUsersRow[]>(query, [1]);
  return rows;
};

export const getUserByDocument = async (documentId: number) => {
  const query =
    "SELECT user_id, role, document_id, user_name FROM users WHERE document_id = ? AND status = ? ";
  const [rows] = await pool.query<readedUsersRow[]>(query, [documentId, 1]);
  return rows;
};

export const addUser = async ({
  role,
  document,
  password,
  userName,
}: addUserDTO) => {
  const query = `
    INSERT INTO users (role, document_id, password, user_name, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query<ResultSetHeader>(query, [
    role,
    document,
    password,
    userName,
    1,
  ]);

  return {
    result: result,
    id: result.insertId,
  };
};

export const updateUser = async (data: updatedUserData) => {
  const query =
    "UPDATE users SET role = ?, document_id = ?, password = ?, user_name  = ? WHERE user_id = ? AND status = ?";

  const [result] = await pool.query<ResultSetHeader>(query, [
    data.role,
    data.document_id,
    data.password,
    data.user_name,
    data.user_id,
    1,
  ]);

  return result;
};

export const deleteUser = async (userId: number) => {
  const [rows]: any = await pool.query(
    `SELECT user_id FROM users WHERE user_id = ? AND status = ?`,
    [userId, 1],
  );

  if (!rows.length) {
    return {
      affected: 0,
      userDeletedId: userId,
    };
  }

  // 2. Hacer soft delete
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE users SET status = ? WHERE user_id = ?`,
    [2, userId],
  );

  return {
    affected: result.affectedRows,
    userDeletedId: userId,
  };
};
export const bulkDelete = async (ids: bulkDeleteDTO) => {
  const [rows]: any = await pool.query(
    `SELECT user_id FROM users WHERE user_id IN (?) AND status = ?`,
    [ids.bulk, 1],
  );

  const existingIds = rows.map((r: any) => r.user_id);

  if (!existingIds.length) {
    return { affected: 0, users: [] };
  }

  const [result]: any = await pool.query(
    `UPDATE users SET status = ? WHERE user_id IN (?)`,
    [2, existingIds],
  );

  return {
    affected: result.affectedRows,
    users: existingIds,
  };
};
