import { Request, Response } from "express";
import groceryService from "../services/grocery-service";

class GroceryController {
  async createGrocery(req: Request, res: Response): Promise<any> {
    try {
      const { name, category, price, stock } = req.body;

      const grocery = await groceryService.createGrocery({
        name,
        category,
        price,
        stock,
      });

      return res.status(201).json({
        success: true,
        message: "Grocery created successfully.",
        data: grocery,
      });
    } catch (error) {
      console.error("Error encountered in create Grocery controller", error);
      throw new Error("Error while creating grocery in controller");
    }
  }
  async getGroceryById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const grocery = await groceryService.getById(id);

      if (!grocery) {
        return res.status(404).json({
          success: false,
          message: `Grocery details not found with id ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Grocery details fetched suceessfully.",
        data: grocery,
      });
    } catch (error) {
      console.error("Error encountered in getGroceryById controller", error);
      throw new Error("Error while getting grocery by  its id in controller");
    }
  }

  async getAllGrocery(req: Request, res: Response): Promise<any> {
    try {
      const page = parseInt(req.query.page as string, 1) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const {users,pagination} = await groceryService.getAllGrocery(
        page,
        limit
      );

      if ( users.length == 0) {
        return res.status(404).json({
            success:false,
            message:"Grocery items not found"
        })
      }
      return res.status(200).json({
        success:true,
        data:users,
        pagination
      })
    } catch (error) {
      console.error("Error encountered in getGroceryById controller", error);
      throw new Error("Error while getting grocery by  its id in controller");
    }
  }

  async updateGrocery(req:Request,res:Response):Promise<any>{
    const {id} = req.params;
    const  {name,price,stock,category} = req.body;
    try {
        const grocery = await groceryService.updateGrocery(id,{name,price,stock,category});

        if (grocery == null) {
            return res.status(400).json({
                success:false,
                message:"Grocery Item not found with ID"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Gracery Item updated successfully."
        })
    } catch (error) {
        console.error("Error encountered in updateGrogery controller", error);
        throw new Error("Error while getting updateGrocery in controller");
    }
  }

  async deleteGrocery(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Please provide id of grocery item.",
        });
      }

      const findGrocery = await groceryService.getById(id);

      if (!findGrocery) {
        return res.status(404).json({
          success: false,
          message: `Grocery not found with ID ${id}`,
        });
      }

      const grocery = await groceryService.removeGrocery(id);

      return res.status(200).json({
        success: true,
        message: "Grocery deleted successfully",
      });
    } catch (error) {
      console.error("Error encountered in deleteGrocery controller");
      throw new Error("failed to delete Grocery");
    }
  }
}

export default new GroceryController();
