import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { verifyToken } from "./jwt-service";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const secret = process.env.JWT_SECRET as string;

    const decode = await verifyToken(token) as unknown as DecodedToken | false;

    if (decode) {
      (req as any).user = decode;
      const isAdmin = await User.findByPk(decode.userId as string);
      console.log(decode);
      

      if (!isAdmin) {
        return res.status(400).json({
            success:false,
            message:"User not  found."
        })
      }

      if (isAdmin?.role != "Admin") {
        return res.status(403).json({
            success:false,
            message:"You are not authorized to perform current action"
        })
      }
      next()
    }
  } catch (error) {
    console.error("Auth middleware failure");
    return res.status(500).json({
        success:false,
        message:"Invalid token"
    })
  }
};

const userAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) :Promise<any>=> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token is missing",
        });
      }
  
      const secret = process.env.JWT_SECRET as string;
  
      const decode = await verifyToken(token) as unknown as DecodedToken | false;
  
      if (decode) {
        req.body.user = decode;
        const isAdmin = await User.findByPk(decode.userId as string);
  
        if (isAdmin?.role == "Admin" || isAdmin?.role == "Customer") {
          next();
        }
      }
    } catch (error) {
      console.error("Auth middleware failure");
      return res.status(500).json({
          success:false,
          message:"Invalid token"
      })
    }
  };
  
  export {authMiddleware,userAuthMiddleware}
  