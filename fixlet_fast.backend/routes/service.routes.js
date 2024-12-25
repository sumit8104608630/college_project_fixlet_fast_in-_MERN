const express=require("express");
const serviceRoute=express.Router();

// let's create the route 

const {inserting_service_data,get_service_data}=require("../controllers/service.controller.js");


serviceRoute.post("/service_data_set",inserting_service_data)
//lets create service get request for different service 
serviceRoute.get("/service_data_get")
serviceRoute.get("/service_data_get",get_service_data);


module.exports=serviceRoute