const express=require("express");
const bookingRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js");
const {get_all_booking,cancel_booking}=require("../controllers/myBooking.controller");


bookingRoute.get("/get_allBooking",checkAuthenticationCookie("accessToken"),get_all_booking);
bookingRoute.post("/deleteBooking",checkAuthenticationCookie("accessToken"),cancel_booking);
module.exports=bookingRoute;