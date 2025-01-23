const Offers=require("../model/offers.model.js");
const User=require("../model/user.model.js");
const Product=require("../model/product.model.js");
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const offer=require("../component/offers.js")

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

module.exports={
    set_offers,
    get_offers
}
