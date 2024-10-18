import { Router } from "express";
import * as userController from "../controller/userController";
import { user_Schema } from "../utils/validationSchema";
import { checkSchema } from "express-validator";
import { isOwnerOrAdmin } from "../middleware";
const router: Router = Router();

router.get("/", isOwnerOrAdmin, userController.getListOfUser);
router.get("/:id", isOwnerOrAdmin, userController.getUserById);
router.get("/get/count", isOwnerOrAdmin, userController.countUsers);
router.put("/:id", isOwnerOrAdmin, checkSchema(user_Schema), userController.updateUser);
router.delete("/:id", isOwnerOrAdmin, userController.deleteUser);

export default router;