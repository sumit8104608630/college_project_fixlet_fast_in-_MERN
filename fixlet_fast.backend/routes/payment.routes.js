const express=require("express");
const paymentRoutes=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js");
const {create_order_id,verify_payment,get_payment_history} =require("../controllers/paymentOrder.controller.js")

paymentRoutes.post("/orderId",create_order_id);
paymentRoutes.post("/verify_payment",checkAuthenticationCookie("accessToken"),verify_payment);
paymentRoutes.get("/payment_history",checkAuthenticationCookie("accessToken"),get_payment_history)


module.exports=paymentRoutes