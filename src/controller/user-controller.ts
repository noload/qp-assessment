import { Request, Response } from "express";
import userService from "../services/user-service";

class UserController {
  async createUser(req: Request, res: Response):Promise<any>{
    try {
      const { email, password, role, name } = req.body;

      const userExist = await userService.getUserByEmail(email);

      if (userExist) {
        return res.status(400).json({
          success: false,
          message: "User already exist  try another email",
        });
      }

      const user = await userService.createUser({
        email,
        role,
        password,
        name,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
  }
}


export default new UserController()