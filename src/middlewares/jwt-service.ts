import jwt from 'jsonwebtoken'

const generateToken =async (userId:number) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string,{expiresIn:"1h"})

        return token;

    } catch (error) {
        console.log("failed to generate token",error);
        throw new Error("Failed to generate token")
        
    }
}

const verifyToken =async (token:string) => {
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);

        if (decode) {
            return decode;
        }else{
            return false;
        }

    } catch (error) {
        console.log("failed to verify token");
        throw new Error("failed to verify token")
    }
}
export {generateToken,verifyToken}