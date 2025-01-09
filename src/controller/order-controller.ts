import { Request, Response } from "express";
import orderService from "../services/order-service";

class OrderController {
  async bookOrder(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.body.user;
      const { items } = req.body;

      if (!userId || !items) {
        return res.status(400).json({
            success:false,
            message:"OrderItems required"
        })
      }

      const { order, OrderItems } = await orderService.bookOrder(userId, items);

      return res.status(200).json({
        success: true,
        message: "Order booked Successfully",
      });
    } catch (error:any) {
      console.error("Error encountered while booking order", error);
      return res.status(500).json({
        suceess:false,
        message:error.message
      })
    }
  }
}


export default new OrderController();