import express from "express";
const serviceRoute = express.Router();

// Let's create the route
import { inserting_service_data, get_service_data } from "../controllers/service.controller.js";


serviceRoute.post("/service_data_set",inserting_service_data)
//lets create service get request for different service 
serviceRoute.get("/service_data_get",get_service_data);


export default serviceRoute;
