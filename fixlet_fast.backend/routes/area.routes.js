import express from 'express';
import { area_of_service } from '../controllers/area.controller.js';

const areaRoute = express.Router();


areaRoute.post("/area_where_we_are",area_of_service)

export default areaRoute;
