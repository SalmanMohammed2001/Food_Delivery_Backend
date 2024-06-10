import express from "express";
import {loginUser, registerUser} from "../Controller/UserController";


const multer = require('multer')

const userRouter = express.Router();


//Image Storage Engine
const storage = multer.diskStorage({
    destination: "src/uploads",
    filename: (req: any, file: any, cb: any) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)


module.exports = userRouter