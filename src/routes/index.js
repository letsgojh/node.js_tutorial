import { Router } from "express";
import productRouter from "./productRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use('/product',productRouter);
router.use('/users',usersRouter);

export default router;