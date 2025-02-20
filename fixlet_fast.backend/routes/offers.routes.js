import express from 'express';
const offerRoutes = express.Router();

import { checkAuthenticationCookie } from '../middlewares/authenticate.middleware.js';
import { set_offers, get_offers } from '../controllers/offers.controller.js';


offerRoutes.post("/setOffers",set_offers);
offerRoutes.get("/get_offers",checkAuthenticationCookie("accessToken"),get_offers);

export default offerRoutes;
