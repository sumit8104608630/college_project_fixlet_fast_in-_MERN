import Offers from "../model/offers.model.js";
import User from "../model/user.model.js";
import Product from "../model/product.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import offer from "../component/offers.js";


const set_offers=asyncHandler(async(req,res)=>{
    try {
        if(!offer){
            return apiError(res,400,"Offer is not available")
        }
        console.log(offer)
        await Offers.create(offer);
        return res.status(201).json({message:"Offer created successfully"})
        
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500);
    }
})
const get_offers=asyncHandler(async(_,res)=>{
    try {
            const offerData=await Offers.aggregate([
                {$group:{
                    _id:"$offersTo",
                    offersDetails: {
                        // Collect product details into an array
                        $push: {
                            serviceId: '$serviceId',
                            subServiceId: '$subServiceId',
                            offerDescription: '$offerDescription',
                            quantity:"$quantity",
                            price:"$price",
                        },
                      },
                      totalPrice:{$sum:"$price"}
                }}
            ]) 
            if(!offerData){
                return apiError(res,400,"Offer is not available")
            }    
            return res.status(200).json(new ApiResponse(200,offerData,"success"))     
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500);
    }
})

export {
    set_offers,
    get_offers
};
