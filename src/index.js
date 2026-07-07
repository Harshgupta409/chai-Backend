// 1. ADD THIS AT THE VERY TOP (Line 1 & 2)
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Uses Google and Cloudflare DNS


// require('dotenv').config({path: './env'})
import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})

















// import express from "express"
// const app=express()
// // function connectDB(){}


// // connectDB()

// ;( async()=> {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME
//         }`)
//         app.on("error",()=>{
//             console.log("ERR:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App islistening on port $
//                 {process.env.PORT}`);
//         })

//     } catch(error){
//         console.error("ERROR:",error)
//         throw err
//     }
// })()

