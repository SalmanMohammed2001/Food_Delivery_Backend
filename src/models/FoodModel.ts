import mongoose from "mongoose";


const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Number,required:true},
    category:{type:Number,required:true},
})
// @ts-ignore
const foodModel=mongoose.models.food || mongoose.models("food",foodSchema)
export  default  foodModel;