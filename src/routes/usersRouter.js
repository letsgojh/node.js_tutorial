import { Router } from "express";
import {getAllUsers,
    getUserById,
    createUser,
    updateAllUser,
    deleteUser
} from "../controllers/userController.js";
const router = Router();

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/',createUser);
router.put('/:id',updateAllUser);
router.delete('/:id',deleteUser);
export default router;