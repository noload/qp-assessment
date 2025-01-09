import {Router} from 'express';
import orderController from '../controller/order-controller';

const router:Router = Router();

router.post("/booking",orderController.bookOrder)

export default router;