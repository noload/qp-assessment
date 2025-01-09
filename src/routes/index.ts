import {Router} from 'express';
import userRoute from "./user-route"
import groceryRoute from './grocery-route'
const router = Router();

router.use("/user",userRoute)
router.use("/grocery",groceryRoute)
export default router;
