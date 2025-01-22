const TimeSlot=require("../model/timeSlot.model");
const time_data=require("../component/timeSlot/time.js")
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");


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

module.exports={
    set_time_data,
    get_time_data
}