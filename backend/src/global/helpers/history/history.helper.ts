import { insertIntoHistorial } from "./model/history.model";
import { LogActionParams } from "./types/history.types";

export const logActionHelper = async ({
  action,
  entity,
  entityId,
  description,
  userId,
}: LogActionParams) => {
  try {
    await insertIntoHistorial(
      action,
      entity,
      entityId,
      description || "",
      userId,
    );
  } catch (error) {
    console.error("Error inserting history record:", error);
  }
};
