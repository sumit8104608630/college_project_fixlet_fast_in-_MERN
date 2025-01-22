const express=require("express");
const visitRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")
const {set_visitFee,get_visitFee_data} =require("../controllers/visitFee.controller.js")
visitRoute.post("/set_visit_fee",checkAuthenticationCookie("accessToken"),set_visitFee);
visitRoute.get("/get_visit_fee",checkAuthenticationCookie("accessToken"),get_visitFee_data);

module.exports=visitRoute