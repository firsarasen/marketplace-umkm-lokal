import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", authMiddleware, createProduct);

router.put("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

export default router;

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Menampilkan semua produk
 *     tags:
 *       - Products
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Menambah produk
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, createProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Mengubah produk
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 */
router.put("/", authMiddleware, createProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Menghapus produk
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 */
router.delete("/", authMiddleware, createProduct);