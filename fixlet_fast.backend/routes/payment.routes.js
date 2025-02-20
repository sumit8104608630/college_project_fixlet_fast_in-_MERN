import express from 'express';
const paymentRoutes = express.Router();

import { checkAuthenticationCookie } from '../middlewares/authenticate.middleware.js';
import { create_order_id, verify_payment, get_payment_history } from '../controllers/paymentOrder.controller.js';

paymentRoutes.post("/orderId",create_order_id);
paymentRoutes.post("/verify_payment",checkAuthenticationCookie("accessToken"),verify_payment);
paymentRoutes.get("/payment_history",checkAuthenticationCookie("accessToken"),get_payment_history)


export default paymentRoutes