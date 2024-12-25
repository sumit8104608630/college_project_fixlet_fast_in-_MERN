const {asyncHandler} =require ("../utils/asyncHandler");
const {ApiResponse} =require("../utils/apiResponse");
const {apiError} =require ("../utils/apiError");
const Area=require("../model/area.model.js")
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
 
const inserting_service_data=asyncHandler(async(_,res)=>{
    try {
        const json =[...electricianJson,...plumberJson,...carpenter,...bathroomKitchen,...homeCleaning,...sofaCleaning,...pestControl,...bedPestControl,...ACservice,...chimney,...stove,...refrigerator,...washinMachine,...mixer,...decoration,...wallPanel,...wallPaint];
        const serviceData=await Service.insertMany(json);
        
        return res.status(201).json( new ApiResponse(200,serviceData,"service created successfully"))
    } catch (error) { 
        console.log(error);
       new  apiError("something went wrong",500);
    }
})

const get_service_data=asyncHandler(async(req,res)=>{
    try {
        const {state,city,categories}=req.query ;

        if(!state||!city||!categories){
            return res.status(400).json(new ApiResponse(400,"please provide all the required fields"))
        }
        
        const area=await Area.findOne({state:state});
        if(!area){
            return res.status(404).json(new ApiResponse(404,"area not found"));
        }
        else{
            const cities=area.city
            if(!cities.includes(city)){
                return res.status(404).json({
                    status:404,
                    message:"city not found",
                    success:false,
                })
            }
        }
            const data=await Service.find({serviceType:categories});
            if(data.length===0){
                return res.status(404).json(new ApiResponse(404, "No service data available for the specified category"));
            }
            return res.status(200).json(new ApiResponse(200,data,"electrician service data"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong on the server. Please try again later"));
    }
})


module.exports={
    inserting_service_data,
    get_service_data,
}