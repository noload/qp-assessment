import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

const userValidation:any = (req:Request, res:Response, next:NextFunction) => {
  const createUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
    }),
    role: Joi.string()
      .valid("Customer", "Admin")
      .optional()
      .messages({
        "any.only": 'Role must be either "Customer" or "Admin".',
      }),
  });

  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error.",
      errors: error.details.map((detail) => detail.message),
    });
  }

  next();
};

export { userValidation };
