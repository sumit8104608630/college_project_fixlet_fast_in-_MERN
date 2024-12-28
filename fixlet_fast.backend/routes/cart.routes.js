const express=require("express");
// creating the route for the cart controller
const cartRoute=express.Router();
// let's collect all functionality
const {add_service_to_cart,cancel_the_service}=require("../controllers/cart.controller");
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")




cartRoute.post("/cart_of_service",checkAuthenticationCookie("accessToken"),add_service_to_cart);
cartRoute.post("/reduce_service_cart",checkAuthenticationCookie("accessToken"),cancel_the_service)

//let's export the module
module.exports=cartRoute         
