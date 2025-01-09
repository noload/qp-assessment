import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createGroceryValidation:any = (req:Request, res:Response, next:NextFunction) => {
  const createGrocerySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty":"Grocery Name cannot be empty"
    }),
    category: Joi.string().optional().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
    stock: Joi.number().required(),
    price: Joi.number().required()
  });

  const { error } = createGrocerySchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export { createGroceryValidation };
