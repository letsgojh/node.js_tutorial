import { Router } from "express";
import productRouter from "./productRouter.js";

const router = Router();

router.use('/products',productRouter);

export default router;