import { Transaction } from "sequelize";
import Grocery, { GroceryCreationAttributes } from "../models/Grocery";
import sequelize from "../config/database";

class GroceryService {
  async createGrocery(data: GroceryCreationAttributes) {
    let transaction: Transaction | null = null;
    try {
      transaction = await sequelize.transaction();

      const grocery = await Grocery.create(data, { transaction });

      await transaction.commit();

      return grocery;
    } catch (error) {
      await transaction?.rollback();
      console.error("Error while  creating grocery in grocery service", error);
      throw new Error("Error in createGrocery service");
    }
  }

  async getById(id: string) {
    let transaction: Transaction | null = null;
    try {
      transaction = await sequelize.transaction();

      const grocery = await Grocery.findByPk(id, { transaction });

      if (!grocery) {
        return null;
      }
      await transaction?.commit();
      return grocery;
    } catch (error) {
      transaction?.rollback();
      console.log("Error in grocery service getById function", error);
      throw new Error("Error which fetching grocery by id");
    }
  }

  async getAllGrocery(page: number = 1, limit: number = 10) {
    let offset = (page - 1) * limit;
    console.log(offset, "iffy");

    let transaction: Transaction | null = null;
    try {
      transaction = await sequelize.transaction();

      const { rows, count } = await Grocery.findAndCountAll({
        offset,
        limit,
        transaction,
      });

      await transaction.commit();
      return {
        users: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          limit,
        },
      };
    } catch (error) {
      transaction?.rollback();
      console.log("Error in grocery service getById function", error);
      throw new Error("Error which fetching grocery by id");
    }
  }

  async updateGrocery(id:string,data:Partial<GroceryCreationAttributes>) {
    let transaction: Transaction | null = null;

    try {
      transaction = await sequelize.transaction();

      const grocery = await this.getById(id)

      if (grocery) {
        const updatedGrocery = await Grocery.update({...data},{where:{id:id},transaction})
        await transaction.commit();
        return updatedGrocery;
      }
      return null;

    } catch (error) {
      transaction?.rollback();
      console.log("Error in grocery service getById function", error);
      throw new Error("Error which fetching grocery by id");
    }
  }

  async removeGrocery(id: string) {
    let transaction: Transaction | null = null;
    try {
      transaction = await sequelize.transaction();

      const grocery = await Grocery.destroy({
        where: { id: id },
        transaction,
      });
      await transaction.commit();
      return grocery;
    } catch (error) {
      await transaction?.rollback();
      console.error(
        "Error encountered while deleting  grocery in service",
        error
      );
      throw new Error("Error while deleting grocery");
    }
  }
}

export default new GroceryService();
