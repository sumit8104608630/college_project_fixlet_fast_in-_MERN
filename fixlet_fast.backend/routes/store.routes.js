import express from "express";
const storeRoute = express.Router();
import { set_all_product, get_all_store_data } from "../controllers/store.controller.js";



storeRoute.post("/set_all_store_data",set_all_product);
storeRoute.get("/get_all_store_data",get_all_store_data);

export default storeRoute;
