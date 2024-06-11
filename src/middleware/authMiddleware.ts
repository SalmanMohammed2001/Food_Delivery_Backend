import * as process from "process";

const jwt=require('jsonwebtoken')

export const  authMiddleware =async (req:any,res:any,next:any)=>{
    const {token}=req.headers

    try{
        if(!token){
            return res.status(500).json({success: false, message: "Invalid  token"})
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId= token_decode.id
        next();
    }catch (error){
        return res.status(500).json({success: false, message: "Internal server error"})
    }

}