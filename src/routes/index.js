import { Router } from "express";
import productRouter from "./productRouter.js";
import usersRouter from "./usersRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use('/products',productRouter);
router.use('/users',usersRouter);
router.use('/orders',orderRouter);

export default router;