import { pool } from "../../../../db/config/db-config";
import { entityTypes, systemActions } from "../../../types/global.types";

export const insertIntoHistorial = async (
  action_code: systemActions,
  entity_type: entityTypes,
  entity_id: number,
  description: string,
  user_id: number,
) => {
  await pool.query(
    `INSERT INTO history
    (action_code, entity_type, entity_id, description, user_id)
    VALUES (?, ?, ?, ?, ?)
  `,
    [action_code, entity_type, entity_id, description, user_id],
  );
};
