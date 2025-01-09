import { Transaction } from "sequelize";
import sequelize from "../config/database";
import Grocery from "../models/Grocery";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";

class OrderService {
  async bookOrder(
    userId: number,
    items: [{ grocery_id: number; quantity: number }]
  ) {
    let transaction: Transaction | null = null;

    try {
      transaction = await sequelize.transaction();
      let totalOrderPrice: number = 0;
      let orderItemData: any[] = [];

      for (const Item of items) {
        const grocery = await Grocery.findByPk(Item.grocery_id);
        if (!grocery) {
            throw new Error(`Grocery item not found with Id ${Item.grocery_id}`)
        }

        if (grocery.stock < Item.quantity) {
            throw new Error(`Insufficient Stock Quantity for GroceryId ${Item.grocery_id}`)
        }

        const totalItemPrice = grocery.price * Item.quantity;
        totalOrderPrice+=totalItemPrice;
        orderItemData.push({
            grocery_id:Item.grocery_id,
            price_per_unit:grocery.price,
            quantity:Item.quantity,
            total_price:totalItemPrice
        })

        grocery.stock -= Item.quantity
        await grocery.save({transaction})
        
      }

      const order = await Order.create({
        user_id:userId,
        status:"Pending",
        total_price:totalOrderPrice,
        order_date:new Date()
      },{transaction})

      for (const orderItem of orderItemData) {
        await OrderItem.create(
          {
            order_id: order.id,
            grocery_id: orderItem.grocery_id,
            quantity: orderItem.quantity,
            price_per_unit: orderItem.price_per_unit,
            total_price: orderItem.total_price,
          },
          { transaction }
        );
      }

      await transaction.commit();
      return {order,OrderItems:orderItemData}

    } catch (error) {
        await transaction?.rollback();
        console.log("Error while order Creation",error);
        
        throw new Error("Error while order creation")
    }

  }
}


export default new OrderService();