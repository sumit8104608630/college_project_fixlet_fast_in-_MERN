const express=require("express");
const userRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")

// let's require all the function
const{userRegister,userLogin,userLogout,userInfo}=require("../controllers/user.controller.js")
//let's create the route for registration and for login
userRoute.post("/user_register",userRegister);
userRoute.post("/user_login",userLogin);
userRoute.get("/user_info",checkAuthenticationCookie("accessToken"),userInfo)
userRoute.post("/user_logout",checkAuthenticationCookie("accessToken"),userLogout);
 
module.exports=userRoute; 