import express from "express"
import  cors from "cors"
// @ts-ignore
import connectDB from "./config/db";
import mongoose from "mongoose";

import bodyParser from "body-parser";

var cookieParser = require('cookie-parser')



//app config
const app=express();
const port = 4000



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


app.use("/api/food",foodRouter)
app.use("/images",express.static('src/uploads'))
app.use("/api/user",userRouter)





// mongodb+srv://salmannisthar123:760088930@cluster0.ladoxqg.mongodb.net/?