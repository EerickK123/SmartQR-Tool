import { ApiResponse } from "../../../global/types/global.types";

export const createResponseHelper = (
  success: boolean,
  result: Record<string, any>,
  message: string,
): ApiResponse<Record<string, any>> => {
  return {
    success,
    result,
    message,
  };
};