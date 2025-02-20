import express from 'express';
// creating the route for the cart controller
const productCartRoute = express.Router();

// let's collect all functionality
import { checkAuthenticationCookie } from '../middlewares/authenticate.middleware.js';





productCartRoute.post("/cart_of_product",checkAuthenticationCookie("accessToken"));
productCartRoute.post("/reduce_product_cart",checkAuthenticationCookie("accessToken"));
productCartRoute.get("/get_all_product_cart",checkAuthenticationCookie("accessToken"));
productCartRoute.get("/productCart_checkout_filter",checkAuthenticationCookie("accessToken"));

//let's export the module         
export default productCartRoute;
