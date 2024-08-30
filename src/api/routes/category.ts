import { Router } from "express";
import * as productHandler from "../controller/categoryHandler";
import { checkSchema } from "express-validator";
import * as validation from "../utils/validationSchema";
const router = Router();

router.get("/api/v1/category", productHandler.getListCategory);

router.post("/api/v1/add-category",
    checkSchema(validation.addCategory_Validation_Schema),
    productHandler.addCategory);

export default router;