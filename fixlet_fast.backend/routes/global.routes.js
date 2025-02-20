import express from 'express';
const globalRoute = express.Router();

import { store_inquire_message, no_of_user_globally, searchFunctionality, get_no_of_cities, send_mail, notify } from '../controllers/global.controller.js';

globalRoute.get("/user_count",no_of_user_globally);
globalRoute.get("/search",searchFunctionality);
globalRoute.get("/no_of_area",get_no_of_cities);
globalRoute.post("/send_mail",send_mail);
globalRoute.post("/send_inquire",store_inquire_message);
globalRoute.get("/notify",notify)


export default globalRoute