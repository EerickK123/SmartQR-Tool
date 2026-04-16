import {
  getUsers,
  getUserByDocument,
  addUser,
  deleteUser,
  bulkDelete,
  updateUser,
} from "../model/users.model";
import { throwErrorHelper } from "../../../global/helpers/error/error.helper";
import { logActionHelper } from "../../../global/helpers/history/history.helper";
import {
  entityTypes,
  systemActions,
  JwtPayload,
} from "../../../global/types/global.types";
import {
  addUserDTO,
  bulkDeleteDTO,
  updatedUserData,
} from "../types/users.types";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const readUsers = async () => {
  const users = await getUsers();
  if (!users || users.length === 0) {
    throwErrorHelper("ERROR.USERS.NO_USERS_FOUND", 404);
  }
  return users;
};

export const readUserByDocument = async (documentId: number) => {
  const user = await getUserByDocument(documentId);
  if (!user || user.length === 0) {
    throwErrorHelper("ERROR.USERS.USER_NOT_FOUND", 404);
  }
  return user;
};

export const createUser = async (
  { role, document, userName, password }: addUserDTO,
  token: string,
) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await addUser({
    role,
    document,
    password: hashPassword,
    userName,
  });

  const payload = Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  logActionHelper({
    action: systemActions.CREATE,
    entity: entityTypes.USER,
    entityId: createdUser.id,
    description: `User ${userName} created with document ${document} by user ID ${payload.user_id}`,
    userId: payload.user_id,
  });

  return createdUser.result;
};

export const deletedUser = async (userId: number, token: string) => {
  const deletedUser = await deleteUser(userId);

  if (deletedUser.affected === 0) {
    throwErrorHelper("ERROR.USERS.USER_NOT_FOUND", 404);
  }
  const payload = Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  logActionHelper({
    action: systemActions.DELETE,
    entity: entityTypes.USER,
    entityId: deletedUser.userDeletedId,
    description: `User with ID: ${deletedUser.userDeletedId} was deleted by user ${payload.user_name}, ID ${payload.user_id}`,
    userId: payload.user_id,
  });
};

export const bulkDeleteUsers = async (data: bulkDeleteDTO, token: string) => {
  const deleteBulk = await bulkDelete(data);

  if (deleteBulk.affected === 0) {
    throwErrorHelper("ERROR.USERS.NO_MATCHES_FOUND", 404);
  }

  const payload = Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  logActionHelper({
    action: systemActions.DELETE,
    entity: entityTypes.USER,
    entityId: deleteBulk.users.join(","),
    description: `Users with IDs: ${deleteBulk.users} were deleted by user ${payload.user_name}, ID ${payload.user_id}`,
    userId: payload.user_id,
  });
};

export const modifyUser = async (data: updatedUserData, token: string) => {
  const hashPassword = await bcrypt.hash(data.password, 10);

  const updatedUser = await updateUser({ ...data, password: hashPassword });

  if (updatedUser.affectedRows === 0) {
    throwErrorHelper("ERROR.USERS.USER_NOT_FOUND", 404);
  }

  const payload = Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  logActionHelper({
    action: systemActions.UPDATE,
    entity: entityTypes.USER,
    entityId: data.user_id,
    description: `User with ID: ${data.user_id} was updated by user ${payload.user_name}, ID ${payload.user_id}`,
    userId: payload.user_id,
  });

  return updatedUser;
};
