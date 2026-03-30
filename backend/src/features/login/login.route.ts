import { Router } from "express";
import { LoginController } from "./controller/login.controller";
import loginValidator from "./validator/login.validator";

const router = Router();

router.post("/login", loginValidator, LoginController);

export default router;
