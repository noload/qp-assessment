import { Request,Response } from 'express';
import User from '../models/user';
export const createUser =async () => {
    try {
      const user =await User.create({name:"Vaibhav",password:"vaia",role:"Admin",email:"vai@gmail.com"}) 
       await user.save();
       console.log("User created : ",user);
       
    } catch (error) {
        console.log("error",error);
        
    }
}