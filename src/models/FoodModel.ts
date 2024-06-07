import mongoose from "mongoose";


const FoodSchema=new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
     image:{type:String,required:true},
    category:{type:String,required:true},
})
// @ts-ignore
export default mongoose.model("food", FoodSchema);
