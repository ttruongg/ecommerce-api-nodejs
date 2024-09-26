import { Router } from "express";
import { checkSchema } from "express-validator";
import { product_Schema } from "../utils/validationSchema";
import * as productController from "../controller/productController";

const router: Router = Router();

router.get("/", productController.getAll_Product);
router.get("/:id", productController.getProductById);
router.post("/", checkSchema(product_Schema), productController.addProduct);
router.put("/:id", checkSchema(product_Schema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/count", productController.countProduct);
router.get("/featured/:count", productController.productsFeatured);
export default router;
