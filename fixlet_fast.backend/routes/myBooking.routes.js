const express=require("express");
const bookingRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js");
const {get_all_booking}=require("../controllers/myBooking.controller");


bookingRoute.get("/get_allBooking",checkAuthenticationCookie("accessToken"),get_all_booking);
module.exports=bookingRoute;