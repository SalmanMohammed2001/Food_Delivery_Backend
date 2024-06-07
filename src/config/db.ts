 import  mongoose from "mongoose";

export  const connectDB =async ()=>{
    // @ts-ignore
    await  mongoose.connection('mongodb+srv://salmannisthar123:760088930@cluster0.ladoxqg.mongodb.net/foot-del').then(()=>{
        console.log("DB connected")
    })
}
