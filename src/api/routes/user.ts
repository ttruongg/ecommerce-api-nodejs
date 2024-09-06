import { Router } from "express";
import * as userController from "../controller/userController";
import { user_Schema } from "../utils/validationSchema";
import { checkSchema } from "express-validator";
const router: Router = Router();

router.post("/api/v1/sign-up", checkSchema(user_Schema), userController.registerUser);

export default router;