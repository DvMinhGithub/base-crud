import { Router } from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);

export default router;
