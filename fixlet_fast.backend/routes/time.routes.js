const express=require("express");
const timeRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")
const {set_time_data,get_time_data}=require("../controllers/time.controller.js")

timeRoute.post("/set_time",checkAuthenticationCookie("accessToken"),set_time_data)
timeRoute.get("/get_time",checkAuthenticationCookie("accessToken"),get_time_data)

module.exports=timeRoute