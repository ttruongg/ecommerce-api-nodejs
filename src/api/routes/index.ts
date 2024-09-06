import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import userRouter from "./user";
const router: Router = Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(userRouter);

export default router;
