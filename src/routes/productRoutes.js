import express from "express";
import productController from "../controllers/productController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/get", productController.searchProducts);

// Protected routes
router.post(
  "/add",
  authenticateToken(["seller"]),
  productController.addProduct
);

router.put(
  "/update/:id",
  authenticateToken(["seller"]),
  productController.updateProduct
);

router.delete(
  "/delete/:id",
  authenticateToken(["seller"]),
  productController.deleteProduct
);

export default router;
