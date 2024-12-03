// let's create the app with the help of express
// first we will initialize the express
const express=require("express")
//let required cookie-parser for setting a cookie of my as well as upcoming url from frontend
const cookieParser = require("cookie-parser");
//creating app
const app=express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential:true,
}))
// let set the file type which  we will except and give
app.use(express.json())
//let use urlencoded
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// let set static folder for the image 
app.use(express.static("public"))
// let set the cookie-parser
app.use(cookieParser());
//export this app
module.exports = {app}