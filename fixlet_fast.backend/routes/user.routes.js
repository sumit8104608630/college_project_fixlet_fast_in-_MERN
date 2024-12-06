const express=require("express");
const userRoute=express.Router();
// let's require all the function
const{userRegister,userLogin,userLogout}=require("../controllers/user.controller.js")
//let's create the route for registration and for login
userRoute.post("/user_register",userRegister);
userRoute.post("/user_login",userLogin);
userRoute.post("/user_logout",userLogout);

module.exports=userRoute;