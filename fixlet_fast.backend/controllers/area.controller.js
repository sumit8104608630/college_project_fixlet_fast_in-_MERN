const Area=require("../model/area.model");
const {ApiResponse} =require("../utils/apiResponse");
const {apiError} =require ("../utils/apiError");
const {asyncHandler} =require ("../utils/asyncHandler");


const area_of_service=asyncHandler(async(req,res)=>{
    try {

        const predefinedAreas = [
            {
              state: "maharashtra",
              city: ["mumbai", "pune", "nagpur","mumbai suburban"]
            },
            { 
              state: "bihar",
              city: ["patna", "gaya", "bhagalpur"]
            }
          ];
          await Area.insertMany(predefinedAreas);
          res.status(201).json({
            message: "States and cities added successfully",
            data: predefinedAreas,
          });
        
    } catch (error) {
        throw new apiError("something went wrong in server please try again after some time",500)
    }
})



module.exports={
    area_of_service
}