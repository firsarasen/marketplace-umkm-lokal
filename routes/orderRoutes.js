import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, getOrderById);

router.put("/:id/status", authMiddleware, updateStatus);

router.delete("/:id", authMiddleware, deleteOrder);

export default router;

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Membuat pesanan
 *     tags:
 *       - Orders
 */
router.post("/", authMiddleware, createOrder);