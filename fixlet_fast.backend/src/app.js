const cors=require("cors")
// let's create the app with the help of express
// first we will initialize the express
const express=require("express")
//let required cookie-parser for setting a cookie of my as well as upcoming url from frontend
const cookieParser = require("cookie-parser");
//creating app
const app=express();
console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))
// let set the file type which  we will except and give
app.use(express.json({limit:"1mb"}));
//let use urlencoded
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// let set static folder for the image 
app.use(express.static("public"))
// let set the cookie-parser
app.use(cookieParser());
//let's use authentication middleWare


 
// let's get the user route and use some url path as middleware for the user route 
// let's use it
const userRoute=require("../routes/user.routes.js");
const serviceRoute = require("../routes/service.routes.js");
const areaRoute=require("../routes/area.routes.js")
const cartRoute=require("../routes/cart.routes.js");



//export this app
app.use("/user",userRoute);
app.use("/service",serviceRoute);
app.use("/area",areaRoute);
app.use("/cart",cartRoute);



module.exports = {app}