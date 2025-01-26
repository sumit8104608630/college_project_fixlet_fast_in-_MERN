const express=require("express");
const paymentRoutes=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js");
const {create_order_id,verify_payment} =require("../controllers/create_order.controller.js")

paymentRoutes.post("/orderId",create_order_id);
paymentRoutes.post("/verify_payment",checkAuthenticationCookie("accessToken"),verify_payment);


module.exports=paymentRoutes