const {asyncHandler} =require ("../utils/asyncHandler");
const {ApiResponse} =require("../utils/apiResponse");
const {apiError} =require ("../utils/apiError");
const Service=require("../model/srvice.model");
const electricianJson =require("../component/fakejsonData.js"); // Assuming this is the data you're working with
const plumberJson =require( "../component/fakeJsonPlumberData.js");
const carpenter =require("../component/fakeCarpenterData.js")
const bathroomKitchen =require ("../component/fakeCleaningbathroomkitchendata.js")
const homeCleaning =require("../component/fakeHomeCleaning.js")
const sofaCleaning =require("../component/fakeSofaCleaningData.js")
const pestControl =require("../component/fakepestjsondata.js")
const bedPestControl=require("../component/fakeBedData.js");
const ACservice=require("../component/fakeACserviceDta.js");
const chimney=require("../component/fakeChimneyData.js");
const stove=require("../component/fakeStoveData.js")
const refrigerator =require("../component/fakeRefrigeratorData.js");
const washinMachine=require("../component/fakeWashingMashineData.js");
const mixer =require("../component/fakeMixerData.js");
const decoration =require("../component/lightDecorationData.js");
const wallPanel=require("../component/fake_wall_panelData.js");
const wallPaint =require("../component/fakeWallPainData.js")
// let's push the data into the service data base 
 
const inserting_service_data=asyncHandler(async(req,res)=>{
    try {
        const json =[...electricianJson,...plumberJson,...carpenter,...bathroomKitchen,...homeCleaning,...sofaCleaning,...pestControl,...bedPestControl,...ACservice,...chimney,...stove,...refrigerator,...washinMachine,...mixer,...decoration,...wallPanel,...wallPaint];
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