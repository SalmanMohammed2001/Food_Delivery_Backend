import UserModel from "../models/UserModel";
import * as process from "process";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const validator=require('validator');


//login user

const loginUser = async (req: any, res: any) => {

    try {
        const { email,password} = req.body

        const user = await UserModel.findOne({email})

        if (!user) {
            return res.status(500).json({success: false, message: "User not found"})
        }

        const isMatch=await  bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(500).json({success: false, message: "Invalid credentials"})
        }

        const token=createToken(user._id);


        return res.status(200).json({success: true, message: "login Successfully ",token})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }

}


const createToken=  (id:any)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register user
const registerUser = async (req: any, res: any) => {

    try {
        const {name, email, password} = req.body

        const exists = await UserModel.findOne({email})

        if (exists) {
            return res.status(500).json({success: false, message: "User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(500).json({success: false, message: "please enter valid email"})
        }

        if(password.length<8){
            return res.status(500).json({success: false, message: "please enter strong password"})
        }

        const salt=await  bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt)

        const newUser =new UserModel({
            name,
            email,
            password:hashPassword
        })

    const user=  await newUser.save()
    const token=createToken(user._id)


        return res.status(200).json({success: true, message: "user Successfully created",token})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }

}


// remove food


export {loginUser, registerUser}