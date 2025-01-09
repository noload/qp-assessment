import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface OrderAttribute {
  id: number;
  user_id: number;
  order_date: Date;
  status: string;
  total_price: number;
  address?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttribute
  extends Optional<OrderAttribute, "id" | "address"> {}

class Order
  extends Model<OrderAttribute, OrderCreationAttribute>
  implements OrderAttribute
{
  declare id: number;
  declare user_id: number;
  declare order_date: Date;
  declare status: string;
  declare total_price: number;
  declare address?: number | undefined;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | undefined;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Pending", "Shipped", "Delivered"],
      defaultValue: "Pending",
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, timestamps: true, modelName: "Order" }
);

export { OrderCreationAttribute };
export default Order;
