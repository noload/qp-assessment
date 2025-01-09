import {Router} from 'express';
import orderController from '../controller/order-controller';
import { userAuthMiddleware } from '../middlewares/authenticate';

const router:Router = Router();

router.post("/booking",userAuthMiddleware,orderController.bookOrder)

export default router;