import express from "express";
import {addToCart, getCart, removeCart} from "../Controller/cartController";
import {authMiddleware} from "../middleware/authMiddleware";



const multer = require('multer')

const cartRouter = express.Router();


//Image Storage Engine
const storage = multer.diskStorage({
    destination: "src/uploads",
    filename: (req: any, file: any, cb: any) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

cartRouter.post("/add",authMiddleware,addToCart )
cartRouter.post("/remove",authMiddleware,removeCart)
cartRouter.get("/get",authMiddleware,getCart)


module.exports = cartRouter