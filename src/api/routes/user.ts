import { Router } from "express";
import * as userController from "../controller/userController";
import { user_Schema } from "../utils/validationSchema";
import { checkSchema } from "express-validator";
const router: Router = Router();

router.get("/", userController.getListOfUser);
router.get("/:id", userController.getUserById);
router.put("/:id", checkSchema(user_Schema), userController.updateUser);
router.delete("/:id", userController.deleteUser);



export default router;