const express=require("express");
const globalRoute=express.Router();

const {no_of_user_globally}=require("../controllers/global.controller")

globalRoute.get("/user_count",no_of_user_globally)

module.exports=globalRoute