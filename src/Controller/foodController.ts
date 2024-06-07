

import  fs from 'fs'
import foodSchema from "../models/FoodModel";
import FoodModel from "../models/FoodModel";


//add food item

const addFood= async (req:any,res:any)=>{

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

     res.status(200).json({success:true,message:"food Successfully created"})
    }catch (error){
      res.status(500).json({success:false,message:"Internal server error"})
    }

}

//all food list

const  listFood=async (req:any,res:any)=>{

    try {
        const  foods=await  FoodModel.find({})
        return   res.status(200).json({success:true,message:"food list",data:foods})

    }catch (error){
     return    res.status(500).json({success:false,message:"Internal server error"})
    }


}


/
export {addFood,listFood}