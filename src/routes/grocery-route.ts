import {Router} from 'express';
import { createGroceryValidation } from '../utils/grocery.validation';
import groceryController from '../controller/grocery-controller';

const router = Router();

router.post("/",createGroceryValidation,groceryController.createGrocery)
router.get("/",groceryController.getAllGrocery)
router.get("/:id",groceryController.getGroceryById)
router.put("/:id",groceryController.updateGrocery)
router.delete("/:id",groceryController.deleteGrocery)

export default router;