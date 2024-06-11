import express from "express"
import  cors from "cors"
// @ts-ignore
import connectDB from "./config/db";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import * as process from "process";

var cookieParser = require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config({ path: 'src/.env' });


//app config
const app=express();
const port = process.env.SERVER



//middleware
app.use(express.json())
app.use(cors())




mongoose.connect('mongodb://127.0.0.1:27017/food-delivery').then(()=>{
    app.listen(port,()=>{
        console.log(`serve running ${port}`)

    })
})

const foodRouter=require('./routes/foodRoutes');
const userRouter=require('./routes/userRoutes');
const cartRouter=require('./routes/cartRoutes');


app.use("/api/food",foodRouter)
app.use("/images",express.static('src/uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)





// mongodb+srv://salmannisthar123:760088930@cluster0.ladoxqg.mongodb.net/?