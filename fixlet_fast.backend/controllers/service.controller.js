const {asyncHandler} =require ("../utils/asyncHandler");
const {ApiResponse} =require("../utils/apiResponse");
const {apiError} =require ("../utils/apiError");
const Service=require("../model/srvice.model");
const electricianJson =require("../component/fakejsonData.js"); // Assuming this is the data you're working with
const plumberJson =require( "../component/fakeJsonPlumberData.js");




// let's push the data into the service data base 

const inserting_service_data=asyncHandler(async(req,res)=>{
    try {
        const json =electricianJson.concat(plumberJson);
        const serviceData=await Service.insertMany(json);
        return res.status(201).json( new ApiResponse(200,serviceData,"service created successfully"))
    } catch (error) {
        console.log(error);
       new  apiError("something went wrong",500);
    }
})

const get_electrician_service_data=asyncHandler(async(req,res)=>{
    try {
            const data=await Service.find({serviceType:"electrician"});
            if(!data){
                throw new apiError("data is not available",404);
            }
            return res.status(200).json(new ApiResponse(200,data,"electrician service data"))
    } catch (error) {
        
    }
})


const get_plumber_service_data=asyncHandler(async(req,res)=>{
    try {
            const data=await Service.find({serviceType:"plumber"});
            if(!data){
                throw new apiError("data is not available",404);
            }
            return res.status(200).json(new ApiResponse(200,data,"plumber service data"))
    } catch (error) {
        
    }
})

module.exports={
    inserting_service_data,
    get_electrician_service_data,
    get_plumber_service_data
}