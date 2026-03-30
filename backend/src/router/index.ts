import { Router } from "express";
import loginRoutes from "../features/login/login.route";
import usersManagerRoutes from "../features/users_manager/users_manager.route";
//import logoutRoutes from "../features/logout/logout.route";
import { authMiddleware } from "../auth/auth.middleware";



const router = Router();

router.use("/auth", loginRoutes);
router.use("/actions", authMiddleware(2) ,usersManagerRoutes);
router.use("/logout", authMiddleware(1));

export default router;
    