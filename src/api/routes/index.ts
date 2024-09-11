import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import userRouter from "./user";
import authentication from "./authentication";
const router: Router = Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(userRouter);
router.use(authentication);

export default router;
