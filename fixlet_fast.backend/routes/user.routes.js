const express=require("express");
const userRoute=express.Router();
// let's require all the function
const{userRegister}=require("../controllers/user.controller.js")
//let's create the route for registration and for login
userRoute.get("/user_register",userRegister);

module.exports=userRoute;