import { Router } from "express";
import { getAllProducts,
    getProductById,
    createProduct,
    updateAllProduct,
    deleteProduct
} from "../controllers/productController.js";
const router = Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',createProduct);
router.put('/:id',updateAllProduct);
//router.patch('/:id',updatePartProduct);
router.delete('/:id',deleteProduct);

export default router;