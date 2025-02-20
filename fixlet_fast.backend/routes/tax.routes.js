import express from "express";
const taxRoute = express.Router();
import { checkAuthenticationCookie } from "../middlewares/authenticate.middleware.js";
import { set_tax, getTaxFee } from "../controllers/tax.controller.js";


taxRoute.post("/set_tax_present",set_tax);
taxRoute.get("/get_tax_fee",getTaxFee);

export default taxRoute;
