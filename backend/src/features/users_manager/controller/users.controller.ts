import {
  readUsers,
  readUserByDocument,
  createUser,
  deletedUser,
  bulkDeleteUsers,
  modifyUser,
} from "../service/users.service";
import { createResponseHelper } from "../../../global/helpers/response/response.helper";
import { addUserDTO, bulkDeleteDTO } from "../types/users.types";

export const getUsers = async (_req: any, res: any) => {
  try {
    const users = await readUsers();
    res.json(
      createResponseHelper(true, { users }, "SUCCESS.USERS.USERS_READED"),
    );
  } catch (error: any) {
    res
      .status(error.status)
      .json(createResponseHelper(false, {}, error.message));
  }
};

export const getUserByDocument = async (req: any, res: any) => {
  try {
    const documentId = Number(req.params.documentId);
    const user = await readUserByDocument(documentId);
    res.json(createResponseHelper(true, { user }, "SUCCESS.USERS.USER_READED"));
  } catch (error: any) {
    res
      .status(error.status)
      .json(createResponseHelper(false, {}, error.message));
  }
};

export const createUsers = async (req: any, res: any) => {
  try {
    const { role, document, userName, password }: addUserDTO = req.body;

    await createUser(
      { role, document, userName, password },
      req.headers.authorization?.split(" ")[1],
    );

    res.json(createResponseHelper(true, {}, "SUCCESS.USERS.USER_CREATED"));
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json(createResponseHelper(false, {}, error.message));
  }
};

export const deleteUsers = async (req: any, res: any) => {
  try {
    const userId = Number(req.params.userId);

    await deletedUser(userId, req.headers.authorization?.split(" ")[1]);

    res.json(createResponseHelper(true, {}, "SUCCESS.USERS.USER_DELETED"));
  } catch (error: any) {
    res
      .status(error.status)
      .json(createResponseHelper(false, {}, error.message));
  }
};

export const bulkDelete = async (req: any, res: any) => {
  try {
    const data: bulkDeleteDTO = req.body;
    await bulkDeleteUsers(data, req.headers.authorization?.split(" ")[1]);
    res.json(createResponseHelper(true, {}, "SUCCESS.USER.BULK_DELETED_DONE"));
  } catch (error: any) {
    res
      .status(error.status||404)
      .json(createResponseHelper(false, {}, error.message));
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const documentId = Number(req.params.documentId);
    const data = req.body;
    await modifyUser(
      { ...data, document_id: documentId },
      req.headers.authorization?.split(" ")[1],
    );
    res.json(createResponseHelper(true, {}, "SUCCESS.USERS.USER_UPDATED"));
  } catch (error: any) {
    res
      .status(error.status || 404)
      .json(createResponseHelper(false, {}, error.message));
  }
};
