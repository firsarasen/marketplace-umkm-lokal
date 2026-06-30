import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload gambar produk
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload berhasil
 *       400:
 *         description: Upload gagal
 */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadImage
);