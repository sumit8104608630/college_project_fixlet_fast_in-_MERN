import TimeSlot from "../model/timeSlot.model.js";
import time_data from "../component/timeSlot/time.js";
// Import the api error for error messages
import { apiError } from "../utils/apiError.js";
// Import the api response for API messages
import { ApiResponse } from "../utils/apiResponse.js";
// Import the asyncHandler utility
import { asyncHandler } from "../utils/asyncHandler.js";


const set_time_data=asyncHandler(async (_,res)=>{
    try {

        const time=await TimeSlot.create(time_data);
        res.status(201).json(new ApiResponse(201,time,"success"))
        
    } catch (error) {
        console.log(error)
        throw new apiError("some thing went wrong",500)
    }
})


const get_time_data=asyncHandler(async (req,res)=>{
    try {
        const {day}=req.query
        if(!day){
            return new apiError("please provide day",400)
        }
        const time=await TimeSlot.findOne({day:day});
        res.status(200).json(new ApiResponse(200,time,"success"))
    } catch (error) {
       console.log(error);
       throw new apiError("some thing went wrong",500)
    }
})

export {
    set_time_data,
    get_time_data
};
