import { Router } from "express";
import loginRoutes from "../features/login/login.route";
import usersManagerRoutes from "../features/users_manager/users_manager.route";
import { authMiddleware } from "../global/middlewares/auth/auth.middleware";
import {roleRequiredMiddleware} from "../global/middlewares/roleRequired/roleRequired.Middleware";



const router = Router();

router.use("/auth", loginRoutes);
router.use("/users", authMiddleware(), roleRequiredMiddleware(2), usersManagerRoutes);
router.use("/logout", authMiddleware() );

export default router;
    