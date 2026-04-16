import { Router } from "express";

import {
  createUsers,
  deleteUsers,
  getUsers,
  getUserByDocument,
  updateUser,
  bulkDelete,
} from "./controller/users.controller";
import {
  addUserValidator,
  bulkDeleteValidator,
  updateUserValidator,
} from "./validator/users.validator";


const router = Router();

router.get("/actions", getUsers);
router.get("/actions/:documentId", getUserByDocument);
router.post("/actions", addUserValidator, createUsers);
router.delete("/actions/:userId", deleteUsers);
router.post("/actions/bulk-delete", bulkDeleteValidator, bulkDelete);
router.put("/actions/:userId", updateUserValidator, updateUser);


export default router;
