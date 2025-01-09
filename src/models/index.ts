import { Sequelize } from "sequelize-typescript";
import path from "path";

const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize({
  username: "root",
  password: "unique@123K",
  database: "Grocery_DB_DEV",
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
