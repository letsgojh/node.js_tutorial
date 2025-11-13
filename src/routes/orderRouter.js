import { Router } from "express";
import { getAllOrders,
    getJoinedOrders,
    createOrder,
    getUserOrders,
} from "../controllers/orderController.js";
const router = Router();

//express라우터는 등록된 순서대로 라우트 검사 -> 만약 /joined라고 해도 :id에 먼저 들어감..
router.get('/',getAllOrders);
router.post('/',createOrder);
router.get('/joined',getJoinedOrders);
router.get('/user/:id',getUserOrders);
export default router;