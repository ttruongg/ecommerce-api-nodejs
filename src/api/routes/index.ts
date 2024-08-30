import { Router } from "express";
import categoryRouter from "./category";

const router: Router = Router();

router.use(categoryRouter);

export default router;
