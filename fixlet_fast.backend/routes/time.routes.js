import express from "express";
const timeRoute = express.Router();
import { checkAuthenticationCookie } from "../middlewares/authenticate.middleware.js";
import { set_time_data, get_time_data } from "../controllers/time.controller.js";



timeRoute.post("/set_time",checkAuthenticationCookie("accessToken"),set_time_data)
timeRoute.get("/get_time",checkAuthenticationCookie("accessToken"),get_time_data)

export default timeRoute;
