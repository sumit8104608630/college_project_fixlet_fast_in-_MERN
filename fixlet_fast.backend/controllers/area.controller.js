import Area from "../model/area.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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


export { area_of_service };
