import {Router} from 'express';
import userRoute from "./user-route"
import groceryRoute from './grocery-route'
import orderRoute  from './order-route'
const router = Router();

router.use("/user",userRoute)
router.use("/grocery",groceryRoute)
router.use("/order",orderRoute)
export default router;
