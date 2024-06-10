

import userModel from "../models/UserModel";
import  jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"
import  validator from "validator"


//login user

const loginUser= async (req:any,res:any)=>{

    try {

   let image_fileName=`${req.file.filename}`

   console.log(image_fileName)
    console.log(req.body)

    const food= new FoodModel ({
        name:req.body.name,
         description:req.body.description,
         price:req.body.price,
         category:req.body.category,
        image:image_fileName,
    })

       food.save().then()

    return  res.status(200).json({success:true,message:"food Successfully created"})
    }catch (error){
   return    res.status(500).json({success:false,message:"Internal server error"})
    }

}

//register user
const  registerUser=async (req:any,res:any)=>{

    try {
        const  foods=await  FoodModel.find({})
        return   res.status(200).json({success:true,message:"food list",data:foods})

    }catch (error){
        return    res.status(500).json({success:false,message:"Internal server error"})
    }


}


// remove food




export {loginUser,registerUser}