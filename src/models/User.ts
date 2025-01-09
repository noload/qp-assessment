import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  name?: string | null;
  email: string;
  password: string;
  role: "Customer" | "Admin";
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "name"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name?: string | null;
  declare email: string;
  declare password: string;
  declare role: "Customer" | "Admin";

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Customer", "Admin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);
export { UserCreationAttributes };
export default User;
