import Tax from "../model/tax.model.js";
// Importing the api error for error message
import { apiError } from "../utils/apiError.js";
// Importing the api response for error message
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import visitFee from "../component/visitFee/visitFee.js";


const set_tax=asyncHandler(async(req,res)=>{
    try {
        await Tax.create([{country:"india",tax:18}])
        return res.status(201).json(new ApiResponse(200,"","Tax set successfully"))
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500)
    }
})

const getTaxFee=asyncHandler(async(req,res)=>{
    try {

        const {totalPrice}=req.query;
        if(!totalPrice){
            return res.status(404)
        }
        const taxPercent=await Tax.findOne({country:"india"});
        const taxAmount=totalPrice*taxPercent.tax/100;
        return res.status(200).json(new ApiResponse(200,taxAmount,"success"))
            
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500);
    }
})

export {
    set_tax,
    getTaxFee
};
