import { Router } from "express";
import { usersManagerController } from "./controller/users_manager";


const router = Router();

router.post("/users", usersManagerController);

export default router;
 