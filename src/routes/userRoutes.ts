
import express from "express";
import {addFood, listFood, removeFood} from "../Controller/foodController";

const multer  = require('multer')

const foodRouter =express.Router();




//Image Storage Engine
const storage=multer.diskStorage({
    destination:"src/uploads",
    filename:(req:any,file:any,cb:any)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const  upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.delete("/remove/:id",removeFood)

module.exports=foodRouter