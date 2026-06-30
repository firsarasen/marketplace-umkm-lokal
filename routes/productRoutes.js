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
 * /api/products/{id}:
 *   get:
 *     summary: Menampilkan detail produk
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail produk berhasil ditampilkan
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Menambah produk
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               category_id:
 *                 type: string
 *                 example: "5f6e7c8d-1234-5678-9abc-def123456789"
 *               name:
 *                 type: string
 *                 example: "Keripik Pisang"
 *               description:
 *                 type: string
 *                 example: "Keripik pisang khas desa"
 *               price:
 *                 type: number
 *                 example: 25000
 *               stock:
 *                 type: integer
 *                 example: 50
 *               image_url:
 *                 type: string
 *                 example: "https://..."
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post("/", authMiddleware, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mengubah produk
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Produk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produk berhasil diubah
 */
router.put("/:id", authMiddleware, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Menghapus produk
 *     tags:
 *       - Products
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
 *         description: Produk berhasil dihapus
 */
router.delete("/:id", authMiddleware, deleteProduct);