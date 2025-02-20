import express from 'express';
const bookingRoute = express.Router();

import { checkAuthenticationCookie } from '../middlewares/authenticate.middleware.js';
import { get_all_booking, cancel_booking } from '../controllers/myBooking.controller.js';


bookingRoute.get("/get_allBooking",checkAuthenticationCookie("accessToken"),get_all_booking);
bookingRoute.post("/deleteBooking",checkAuthenticationCookie("accessToken"),cancel_booking);

export default bookingRoute;