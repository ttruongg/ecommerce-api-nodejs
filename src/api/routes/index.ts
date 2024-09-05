import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
const router: Router = Router();

router.use(categoryRouter);
router.use(productRouter);

export default router;
