import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, userOrder, verifyOrder, listOrders, updateStatus, codOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/cod", authMiddleware, codOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus);


export default orderRouter

