import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import userRouter from "./user";
import authentication from "./authentication";

const api = process.env.API_URL;
const router: Router = Router();


router.use(`${api}/categories`,categoryRouter);
router.use(`${api}/products`,productRouter);
router.use(`${api}/users`,userRouter);
router.use(authentication);

export default router;
