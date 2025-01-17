const express=require("express");
const storeRoute=express.Router();
const {set_all_product,get_all_store_data}=require("../controllers/store.controller")

storeRoute.post("/set_all_store_data",set_all_product);
storeRoute.get("/get_all_store_data",get_all_store_data);

module.exports=storeRoute
