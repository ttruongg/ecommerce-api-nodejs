import { Router } from "express";
import { checkSchema } from "express-validator";
import { product_Schema } from "../utils/validationSchema";
import * as productController from "../controller/productController";

const router: Router = Router();

router.get("/api/v1/products", productController.getAll_Product);
router.get("/api/v1/product/:id", productController.getProductById);
router.post("/api/v1/add-product", checkSchema(product_Schema), productController.addProduct);
router.put("/api/v1/edit-product/:id", checkSchema(product_Schema), productController.updateProduct);
router.delete("/api/v1/delete-product/:id", productController.deleteProduct);
router.get("/api/v1/products/count", productController.countProduct);
router.get("/api/v1/products/featured/:count", productController.productsFeatured);
export default router;
