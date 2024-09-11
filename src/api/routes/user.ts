import { Router } from "express";
import * as userController from "../controller/userController";
import { user_Schema } from "../utils/validationSchema";
import { checkSchema } from "express-validator";
const router: Router = Router();


router.put("/api/v1/update-user/:id", checkSchema(user_Schema), userController.updateUser);




export default router;