import { Router } from "express";
import { checkSchema } from "express-validator";
import { product_Schema } from "../utils/validationSchema";
import * as productController from "../controller/productController";
import { isOwnerOrAdmin } from "../middleware";

const router: Router = Router();

router.get("/", productController.getAll_Product);
router.get("/:id", productController.getProductById);
router.post("/", isOwnerOrAdmin, checkSchema(product_Schema), productController.addProduct);
router.put("/:id", isOwnerOrAdmin, checkSchema(product_Schema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/get/count", productController.countProduct);
router.get("/featured/:count", productController.productsFeatured);
export default router;
