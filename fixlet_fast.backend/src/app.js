const cors=require("cors")
// let's create the app with the help of express
// first we will initialize the express
const express=require("express")
//let required cookie-parser for setting a cookie of my as well as upcoming url from frontend
const cookieParser = require("cookie-parser");
//creating app
const app=express();
const allOrigin=process.env.CORS_ORIGIN?.split(",")
app.use(cors({
    origin: allOrigin,
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
const globalRoute=require("../routes/global.routes.js");
const storeRoute=require("../routes/store.routes.js")
const timeRoute=require("../routes/time.routes.js")
const visitRoute=require("../routes/visitation.routes.js")
const taxRoute=require("../routes/tax.routes.js")
const paymentRoute = require("../routes/payment.routes.js");
const offersRoute=require("../routes/offers.routes.js")
const bookingRoute=require("../routes/myBooking.routes")

// all route middleware is here
app.use("/user",userRoute);
app.use("/service",serviceRoute);
app.use("/area",areaRoute);
app.use("/cart",cartRoute);
app.use("/global",globalRoute);
app.use("/store",storeRoute);
app.use("/time",timeRoute);
app.use("/visit",visitRoute);
app.use("/tax",taxRoute);
app.use("/offer",offersRoute);
app.use('/payment',paymentRoute);
app.use("/book",bookingRoute);


//export this app

module.exports = {app}