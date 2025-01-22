const visitationFee=require("../model/visitationFee.model.js");
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const visitFee=require("../component/visitFee/visitFee.js")


const set_visitFee=asyncHandler(async(req,res)=>{
    try {

        if(!visitFee){
            return ApiResponse(res,400,"No visit fee found")
        }
        const visitFeeData=await visitationFee.create(visitFee)
        
        return res.status(201).json(new ApiResponse(201,visitFeeData,"success"))

        
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500)
    }
})

const get_visitFee_data=asyncHandler(async(req,res)=>{
    try {

        const {type}=req.query;
        if(!type){
            return ApiResponse(res,400,"Please provide type of visit fee")
        }
        const visitFeeData=await visitationFee.findOne({serviceType:type});
        return res.status(200).json(new ApiResponse(200,visitFeeData,"success"));
        
    } catch (error) {
        console.log(error);
        throw new apiError("something went wrong",500);
    }
})

module.exports={
    set_visitFee,
    get_visitFee_data
}