import { Router } from "express";
import * as categorytHandler from "../controller/categoryHandler";
import { checkSchema } from "express-validator";
import * as validation from "../utils/validationSchema";
const router = Router();

router.get("/api/v1/category", categorytHandler.getListCategory);

router.post("/api/v1/add-category",
    checkSchema(validation.addCategory_Validation_Schema),
    categorytHandler.addCategory);

router.delete("/api/v1/delete-category/:id", categorytHandler.deleteCategory);
router.put("/api/v1/update-category", categorytHandler.updateCategory);
export default router;