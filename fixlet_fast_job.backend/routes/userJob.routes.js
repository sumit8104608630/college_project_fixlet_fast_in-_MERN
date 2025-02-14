const express=require("express");
const userJobRoute=express.Router();
const {generate_otp,registration,user_login}=require("../controllers/userJob.controller.js");
const upload=require("../middlewares/multer.middleware.js")

userJobRoute.post("/user_otp",generate_otp);
userJobRoute.post("/user_register",upload.single("profilePhoto"),registration);
userJobRoute.post("/user_login",user_login);

module.exports=userJobRoute;
