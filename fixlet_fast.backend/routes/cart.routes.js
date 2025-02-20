import express from 'express';
// creating the route for the cart controller
const cartRoute = express.Router();
// let's collect all functionality
import { add_service_to_cart, cancel_the_service, get_all_cart_services, checkout_filter } from '../controllers/cart.controller.js';
import { checkAuthenticationCookie } from '../middlewares/authenticate.middleware.js';





cartRoute.post("/cart_of_service",checkAuthenticationCookie("accessToken"),add_service_to_cart);
cartRoute.post("/reduce_service_cart",checkAuthenticationCookie("accessToken"),cancel_the_service);
cartRoute.get("/get_all_services_cart",checkAuthenticationCookie("accessToken"),get_all_cart_services);
cartRoute.get("/cart_checkout_filter",checkAuthenticationCookie("accessToken"),checkout_filter);

//let's export the module         
export default cartRoute         
