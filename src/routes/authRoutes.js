import express from "express";
import authController from "../controllers/authController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/status", authenticateToken(), authController.status);
router.post("/logout", authController.logout);

export default router;
