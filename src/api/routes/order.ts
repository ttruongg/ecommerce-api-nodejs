import { Router } from "express";
import * as orderController from "../controller/orderController";


const router: Router = Router();
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);
router.get("/get/totalSales", orderController.totalSales);
router.get("/get/count", orderController.countOrders);
router.get("/get/userOrder/:userid", orderController.userOrder);
export default router;