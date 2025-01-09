const express=require("express");
const userRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")

// let's require all the function
const{userRegister,userLogin,userLogout,userInfo,generateOtp,verify_otp,saveUserAddress,saveUserCustomAddress,changePassword,changeEmail,checkPassword}=require("../controllers/user.controller.js")
//let's create the route for registration and for login
userRoute.post("/user_register",userRegister);
userRoute.post("/user_login",userLogin);
userRoute.get("/user_info",checkAuthenticationCookie("accessToken"),userInfo)
userRoute.post("/user_logout",checkAuthenticationCookie("accessToken"),userLogout);
userRoute.post("/user_otp",generateOtp);
userRoute.post("/verify_user_otp",verify_otp);
userRoute.post("/storeAddress",checkAuthenticationCookie("accessToken"),saveUserAddress);
userRoute.post("/store_custom_address",checkAuthenticationCookie("accessToken"),saveUserCustomAddress);
userRoute.post("/change_password",checkAuthenticationCookie("accessToken"),changePassword)
userRoute.post("/changeEmail",checkAuthenticationCookie("accessToken"),changeEmail)
userRoute.post("/check_password",checkAuthenticationCookie("accessToken"),checkPassword)
module.exports=userRoute; 