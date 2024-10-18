import { Router } from "express";
import * as categorytHandler from "../controller/categoryHandler";
import { checkSchema } from "express-validator";
import * as validation from "../utils/validationSchema";
import { isOwnerOrAdmin } from "../middleware";
const router: Router = Router();

router.get("/", categorytHandler.getListCategory);
router.get("/:id", categorytHandler.getCategoryById);
router.post("/", isOwnerOrAdmin, checkSchema(validation.addCategory_Validation_Schema), categorytHandler.addCategory);

router.delete("/:id", isOwnerOrAdmin, categorytHandler.deleteCategory);
router.put("/:id", isOwnerOrAdmin, checkSchema(validation.addCategory_Validation_Schema), categorytHandler.updateCategory);

export default router;