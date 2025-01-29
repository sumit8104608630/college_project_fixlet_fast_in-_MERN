const express=require("express");
const globalRoute=express.Router();

const {no_of_user_globally,searchFunctionality,get_no_of_cities,send_mail}=require("../controllers/global.controller")

globalRoute.get("/user_count",no_of_user_globally);
globalRoute.get("/search",searchFunctionality);
globalRoute.get("/no_of_area",get_no_of_cities);
globalRoute.post("/send_mail",send_mail);


module.exports=globalRoute