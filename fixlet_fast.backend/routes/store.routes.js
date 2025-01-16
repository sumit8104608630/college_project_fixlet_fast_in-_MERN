const express=require("express");
const storeRoute=express.Router();
const {set_all_product}=require("../controllers/store.controller")

storeRoute.post("/set_all_store_data",set_all_product);

module.exports=storeRoute
