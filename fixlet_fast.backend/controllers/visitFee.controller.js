import visitationFee from "../model/visitationFee.model.js";
// Importing the API error for error messages
import { apiError } from "../utils/apiError.js";
// Importing the API response for error messages
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import visitFee from "../component/visitFee/visitFee.js";
import Offers from "../model/offers.model.js";
import Cart from "../model/cart.model.js";
import User from "../model/user.model.js";



const set_visitFee=asyncHandler(async(req,res)=>{
    try {
        if(!visitFee){
            return ApiResponse(res,400,"No visit fee found")
        }
        const visitFeeData=await visitationFee.create(visitFee)
        console.log(visitFee)
        
        return res.status(201).json(new ApiResponse(201,visitFeeData,"success"))

        
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500)
    }
})

const get_visitFee_data=asyncHandler(async(req,res)=>{
    try {
        const {type}=req.query;
        const categories=type
        const offers=await Offers.findOne({offersTo:"visitation"});

        let offerPrice;
        if(offers){
           offerPrice=offers.price;
        }else{
         offerPrice=0
        }

        const userId=req.user._id
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }
        const cart=await Cart.findOne({userId:userId});
        if(!cart){
            return res.status(404).json(new ApiResponse(404, "Cart not found"));
        }
    
             
        const group_cart = await Cart.aggregate([
            { $match: { userId: userId } },
            { $unwind: '$products' },
            { $unwind: '$products.subServices' },
            {
              $group: {
                _id: '$products.serviceType',
                serviceTypeName: { $first: '$products.serviceTypeName' },
                orderId:{$first:`$products._id`},
                totalQuantity: { $sum: '$products.subServices.quantity' },
                totalService: { $sum: 1 },
                totalTime:{$sum:'$products.subServices.serviceTime'},
                totalPrice: { $sum: '$products.subServices.totalPrice' },
              },
            },
            { $sort: { totalQuantity: -1 } },
          ]);
    
          
        
    const product=await group_cart.filter(item=>item._id===categories)[0]
    
          
        


        if(!type){
            return ApiResponse(res,400,"Please provide type of visit fee")
        }
        const visitFeeData=await visitationFee.findOne({serviceType:type});
          if(!visitFeeData){
         return res.status(404).json(new ApiResponse(404,"","No visit fee data found"))
        }
        const visitFeeDataObj=await visitFeeData.toObject();

      
        const updatedPrice = {
            ...visitFeeDataObj,
            price: Math.max(0, visitFeeDataObj.price - offerPrice) // Ensures price doesn't go below 0
        };
  
        if(product?.totalQuantity>=offers.quantity){ 
            return res.status(200).json(new ApiResponse(200,updatedPrice,"success"));

        }
        else{
            return res.status(200).json(new ApiResponse(200,visitFeeData,"success"));

        }
 

    } catch (error) {
        console.log(error);
        throw new apiError("something went wrong",500);
    }
})

export {
    set_visitFee,
    get_visitFee_data
};
