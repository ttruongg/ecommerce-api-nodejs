import { Router } from "express";
import { checkSchema } from "express-validator";
import { user_Schema } from "../utils/validationSchema";
import * as authentication from "../controller/authentication";

const router = Router();

router.post("/api/v1/auth/register", checkSchema(user_Schema), authentication.registerUser);
router.post("/api/v1/auth/login", authentication.logInUser);

export default router;
