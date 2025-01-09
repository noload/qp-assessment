import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface OrderItemAttribute {
  id: number;
  order_id: number;
  grocery_id: number;
  price_per_unit: number;
  total_price: number;
  quantity: number;
}

interface OrderItemCreation extends Optional<OrderItemAttribute, "id"> {}

class OrderItem
  extends Model<OrderItemAttribute, OrderItemCreation>
  implements OrderItemAttribute
{
  declare id: number;
  declare order_id: number;
  declare grocery_id: number;
  declare price_per_unit: number;
  declare total_price: number;
  declare quantity: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    grocery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Groceries",
        key: "id",
      },
    },
    price_per_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { sequelize, modelName: "OrderItem", timestamps: true }
);
export {OrderItemCreation}
export default OrderItem