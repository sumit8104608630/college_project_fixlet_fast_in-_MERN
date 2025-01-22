const express=require("express");
const taxRoute=express.Router();
const {checkAuthenticationCookie}=require("../middlewares/authenticate.middleware.js")
const {set_tax,getTaxFee} =require("../controllers/tax.controller.js")
taxRoute.post("/set_tax_present",set_tax);
taxRoute.get("/get_tax_fee",getTaxFee);

module.exports=taxRoute