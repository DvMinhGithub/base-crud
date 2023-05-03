import { authController } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refresh);

export default router;
