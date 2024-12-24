const express=require("express");
const areaRoute=express.Router();
const {area_of_service}=require("../controllers/area.controller")

areaRoute.post("/area_where_we_are",area_of_service)

module.exports=areaRoute;