const express=require("express");
const globalRoute=express.Router();

const {no_of_user_globally,searchFunctionality}=require("../controllers/global.controller")

globalRoute.get("/user_count",no_of_user_globally);
globalRoute.get("/search",searchFunctionality)

module.exports=globalRoute