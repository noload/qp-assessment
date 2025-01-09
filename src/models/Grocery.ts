import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface GroceryAttribute {
  id: number;
  name: string;
  category?: string | "Fruits";
  stock: number | 0;
  price: number;
}

interface GroceryCreationAttributes
  extends Optional<GroceryAttribute, "id" | "category"> {}

class Grocery
  extends Model<GroceryAttribute, GroceryCreationAttributes>
  implements GroceryAttribute
{
  declare id: number;
  declare name: string;
  declare category?: string | undefined;
  declare stock: number;
  declare price: number;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:"Fruits"
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Grocery" }
);
