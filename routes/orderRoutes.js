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
 *   get:
 *     summary: Menampilkan semua pesanan
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pesanan berhasil ditampilkan
 */
router.get("/", authMiddleware, getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Menampilkan detail pesanan
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail pesanan berhasil ditampilkan
 */
router.get("/:id", authMiddleware, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Membuat pesanan
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "uuid-produk"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pesanan berhasil dibuat
 */
router.post("/", authMiddleware, createOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Mengubah status pesanan
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: dikirim
 *     responses:
 *       200:
 *         description: Status berhasil diubah
 */
router.put("/:id/status", authMiddleware, updateStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Menghapus pesanan
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pesanan berhasil dihapus
 */
router.delete("/:id", authMiddleware, deleteOrder);