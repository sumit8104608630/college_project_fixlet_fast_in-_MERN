const express=require("express");
const offerRoutes=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")
const {set_offers,get_offers}=require("../controllers/offers.controller")
offerRoutes.post("/setOffers",set_offers);
offerRoutes.get("/get_offers",checkAuthenticationCookie("accessToken"),get_offers);

module.exports=offerRoutes;
