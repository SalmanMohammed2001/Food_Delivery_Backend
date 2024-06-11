import express from "express";
import {addToCart, getCart, removeCart} from "../Controller/cartController";



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

cartRouter.post("/add", addToCart )
cartRouter.post("/remove", removeCart)
cartRouter.get("/get", getCart)


module.exports = cartRouter