import { Router } from "express";
import userController from "../controller/user-controller";
import { userValidation } from "../utils/user.validation";

const router = Router();

router.post("/",userValidation,userController.createUser)

export default router;