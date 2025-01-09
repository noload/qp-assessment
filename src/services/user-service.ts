import { Transaction } from 'sequelize';
import User, { UserCreationAttributes } from '../models/User';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/jwt-service';
class UserService{
    async createUser(data:UserCreationAttributes) {
        let transaction:Transaction | null = null;

        try {
            
            transaction = await sequelize.transaction();
            const hashPassword = await bcrypt.hash(data.password,10)
            data.password = hashPassword;

            const user =await User.create(data,{transaction});

            await transaction.commit();

            return user;

        } catch (error) {
            console.error("Error in createUser service",error)

            throw new Error("Failed to create user. Please try again")
            
        }
    }
    async getUserByEmail(email:string):Promise<User | null>{
        try {
            let transaction :Transaction | null = null;

            transaction = await sequelize.transaction();

            const user = await User.findOne({where:{email},transaction})

            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
           console.error("Error in getUserByEmail service");
           
           throw new Error("Error which fething user details by email");
        }
    }
    async login(data:Partial<UserCreationAttributes>):Promise<any>{
        try {
            const {email,password}=data;
            const findUser = await User.findOne({where:{email}})

            if (!findUser || !findUser.password || !password) {
                return null;
            }

            const passwordMatch = await bcrypt.compare(password, findUser.password);

            if (!passwordMatch) {
              return null;
            }

            const token = await generateToken(findUser.id)
            console.log(token);
            
        
            return {userId:findUser.id, token}

        } catch (error) {
            console.error("Error while logginIn");
            throw new Error("Error in Login service")
        }
    }
}

export default new UserService();