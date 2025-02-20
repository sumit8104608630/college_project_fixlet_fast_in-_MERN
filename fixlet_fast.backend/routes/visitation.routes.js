import express from "express";
const visitRoute = express.Router();
import { checkAuthenticationCookie } from "../middlewares/authenticate.middleware.js";
import { set_visitFee, get_visitFee_data } from "../controllers/visitFee.controller.js";


visitRoute.post("/set_visit_fee",checkAuthenticationCookie("accessToken"),set_visitFee);
visitRoute.get("/get_visit_fee",checkAuthenticationCookie("accessToken"),get_visitFee_data);

export default visitRoute;
