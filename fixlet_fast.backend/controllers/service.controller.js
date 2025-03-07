import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import Area from "../model/area.model.js";
import Service from "../model/service.model.js";
import electricianJson from "../component/fakejsonData.js"; // Assuming this is the data you're working with
import plumberJson from "../component/fakeJsonPlumberData.js";
import carpenter from "../component/fakeCarpenterData.js";
import bathroomKitchen from "../component/fakeCleaningbathroomkitchendata.js";
import homeCleaning from "../component/fakeHomeCleaning.js";
import sofaCleaning from "../component/fakeSofaCleaningData.js";
import pestControl from "../component/fakepestjsondata.js";
import bedPestControl from "../component/fakeBedData.js";
import ACservice from "../component/fakeACserviceDta.js";
import chimney from "../component/fakeChimneyData.js";
import stove from "../component/fakeStoveData.js";
import refrigerator from "../component/fakeRefrigeratorData.js";
import washingMachine from "../component/fakeWashingMashineData.js";
import mixer from "../component/fakeMixerData.js";
import decoration from "../component/lightDecorationData.js";
import wallPanel from "../component/fake_wall_panelData.js";
import wallPaint from "../component/fakeWallPainData.js";
import Offers from "../model/offers.model.js";


// let's push the data into the service data base 
 
const inserting_service_data=asyncHandler(async(_,res)=>{
    try {
        const json =[...electricianJson,...plumberJson,...carpenter,...bathroomKitchen,...homeCleaning,...sofaCleaning,...pestControl,...bedPestControl,...ACservice,...chimney,...stove,...refrigerator,...washingMachine,...mixer,...decoration,...wallPanel,...wallPaint];
        const serviceData=await Service.insertMany(json);
        
        return res.status(201).json( new ApiResponse(200,serviceData,"service created successfully"))
    } catch (error) { 
        console.log(error);
       new  apiError("something went wrong",500);
    }
})
const get_service_data = asyncHandler(async (req, res) => {
    try {
        const { state , city , categories } = req.query;

        if (!categories) {
            return res.status(400).json(new ApiResponse(400, "Please provide the required category"));
        }

        // Find the area
        const area = await Area.findOne({ state });
        if (!area) {
            return res.status(404).json(new ApiResponse(404, "Area not found"));
        }

        // Check if the city exists in the area
        const cities = area.city || [];
        if (!cities.includes(city)) {
            return res.status(404).json({
                status: 404,
                message: "City not found",
                success: false,
            });
        }

        // Fetch services based on category
        const data = await Service.find({ serviceType: categories });
        // If no data found for the category
        if (data.length === 0) {
            return res.status(404).json(new ApiResponse(404, "No service data available for the specified category"));
        }

        // Fetch offers for the category
        const offers = await Offers.findOne({ offersTo: categories });

        if (!offers) {
            // If no offers, return data as is
            return res.status(200).json(new ApiResponse(200, data, "Service data fetched successfully"));
        }

        // Apply offers to the service data
        const updatedData = data.map(service => {
            if (service._id.toString() === offers.serviceId.toString()) {
                const updatedSubTypes = service.serviceSubType.map(subType => {
                    if (subType._id.toString() === offers.subServiceId) {
                        const discountedPrice = Math.max(0, subType.price - offers.price);
                        return {
                            ...subType.toObject(),
                            price: discountedPrice,
                            offerDescription: offers.offerDescription,
                        };
                    }
                    return subType.toObject();
                });

                return { ...service.toObject(), serviceSubType: updatedSubTypes };
            }
            return service.toObject();
        });

        // Return the updated data with applied offers
        return res.status(200).json(new ApiResponse(200, updatedData, "Service data with offers fetched successfully"));

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json(new ApiResponse(500, "Something went wrong on the server. Please try again later"));
    }
});

  
  
  
// let's write the functionality for quick installation

// const get_quick_installation=asyncHandler((req,res)=>{
//     try {

//         const 
        
        
//     } catch (error) {
//         console.log(error.message)
//         throw new apiError("some thing wnt wrong",error);
//     }
// })


export {
    inserting_service_data,
    get_service_data
};
