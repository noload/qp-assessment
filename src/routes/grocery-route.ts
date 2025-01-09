import {Router} from 'express';
import { createGroceryValidation } from '../utils/grocery.validation';
import groceryController from '../controller/grocery-controller';
import { authMiddleware, userAuthMiddleware } from '../middlewares/authenticate';

const router = Router();

router.post("/",createGroceryValidation,authMiddleware,groceryController.createGrocery)
router.get("/",userAuthMiddleware,groceryController.getAllGrocery)
router.get("/:id",userAuthMiddleware,groceryController.getGroceryById)
router.put("/:id",authMiddleware,groceryController.updateGrocery)
router.delete("/:id",authMiddleware,groceryController.deleteGrocery)

export default router;