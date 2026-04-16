import {entityTypes, systemActions} from "../../../types/global.types";

export interface LogActionParams {
  action: systemActions;
  entity: entityTypes;
  entityId: number;
  description?: string;
  userId: number;
}