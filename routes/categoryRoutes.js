import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.post("/", authMiddleware, createCategory);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Menampilkan semua kategori
 *     tags:
 *       - Categories
 */
router.get("/", getCategories);