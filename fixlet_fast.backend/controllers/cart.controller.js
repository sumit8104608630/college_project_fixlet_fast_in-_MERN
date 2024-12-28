const {asyncHandler}=require("../utils/asyncHandler.js");
// let's require the api error for error message 
 const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
//let's require the cart model and service model
const Cart=require("../model/cart.model.js");
const Service=require("../model/service.model.js");
const User =require("../model/user.model.js") 

// now let create the addTo cart functionality  

const add_service_to_cart=asyncHandler(async(req,res)=>{
    try {
        const userId=req.user._id;
        const {serviceId,subServiceId,quantity}=req.body;

        const user =await User.findById(userId);
        
        if(!user) return apiError(res,400,"User not found");
        const service =await Service.findById(serviceId);
        if(!service) return apiError(res,400,"Service not found");
        const subService =await service.serviceSubType.find((sub)=>sub._id.toString()===subServiceId.toString());

        if(!subService)return apiError(res,400,"Service not found");


        // now let check if the user already exist in cart or not
        let cart = await Cart.findOne({userId:userId});
        if(!cart){
            cart =new Cart({
                userId:userId,
                products:[{
                    serviceId:serviceId,
                    subServiceId:subServiceId,
                    quantity:quantity,
                    totalPrice:quantity*subService.price,
                }
                ]
            })
        }
        else{
            const productIndex =await cart.products.findIndex((product)=>product.serviceId.toString()===serviceId.toString()&&product.subServiceId.toString()===subServiceId.toString());
            if(productIndex!==-1){
                cart.products[productIndex].quantity+=Number(quantity);
                cart.products[productIndex].totalPrice = cart.products[productIndex].quantity*subService.price;
            }
            else{
                cart.products.push({
                    serviceId:serviceId,
                    subServiceId:subServiceId,
                    quantity:quantity,
                    totalPrice:quantity*subService.price,
                })
            }

        }

        await cart.save();
        return res.status(201).json(new ApiResponse(201,cart.products,"data is save in the cart"))
       

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong please try again"))
    }
})

// now let's create the functionality the cancellation  of the service 

const cancel_the_service=asyncHandler(async(req,res)=>{
    try {

        const userId=req.user._id;
        const {serviceId,subServiceId}=req.body;
        const service =await Service.findById(serviceId);
        const subService =await service.serviceSubType.find((sub)=>sub._id.toString()===subServiceId.toString());
        if(!serviceId){
            return res.status(400).json(new ApiResponse(400,"service id is required"));
        }

        if(!subServiceId){
            return res.status(400).json(new ApiResponse(400,"sub service id is required"));
        }
        const cart = await Cart.findOne({userId:userId});
        if(!cart){
            return res.status(404).json(new ApiResponse(404,"cart not found"))
        } 
        const productIndex =await cart.products.findIndex((product)=>product.serviceId.toString()===serviceId.toString()&&product.subServiceId.toString()===subServiceId.toString());
        if(productIndex===-1){
            return res.status(404).json(new ApiResponse(404,"product not found in the cart"));
        }
        const product=cart.products[productIndex];
        if(product){
            if(product.quantity===1){
                cart.products.splice(productIndex,1);
            }
            else{
                if(product.quantity>1){
                    product.quantity-=1;
                    product.totalPrice=product.quantity*subService.price;
                }
            }
        }
        await cart.save();
        return res.status(200).json(new ApiResponse(200,"service cancelled successfully"))
        
    } catch (error) {
        console.log(error)
        return apiError("something went wrong in server",500);
    }
})


// let's create the functionality get all cart services of particular user Id
const get_all_cart_services=asyncHandler(async(req,res)=>{
    try {

        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json(new ApiResponse(404,"user not found"));
        }
        const cart =await Cart.findOne({userId:userId});
        if(!cart){
            return res.status(404).json(new ApiResponse(404,"cart not found"));
        }
        // let's create the array of the object which i want to send to the user or frontend
        const cartServicesGrouped = await Cart.aggregate([
            {
              $unwind: "$products" // Deconstruct the products array
            },
            {
              $group: {
                _id: "$products.serviceId", // Group by serviceId
                products: { $push: "$products" } // Collect products under the same serviceId into an array
              }
            },
            {
              $lookup: {
                from: "services", // The Service collection
                localField: "_id", // The serviceId in the Cart's product
                foreignField: "_id", // The _id in the Service collection
                as: "serviceDetails" // The result of the lookup
              }
            },
            {
              $project: {
                serviceId: "$_id", // Rename _id to serviceId
                products: 1, // Keep the products array
                serviceDetails: { $arrayElemAt: ["$serviceDetails", 0] } // Pick the first matching service (assuming 1 service per group)
              }
            }
          ]);
          console.log(await cartServicesGrouped[0].serviceDetails);
      
          return res.status(200).json({
            cartServicesGrouped: cartServicesGrouped
          });
        
    } catch (error) {
        console.log(error);
        return apiError("something went wrong in server",500);
    }
})





// lets export all functionality
module.exports={
    add_service_to_cart, 
    cancel_the_service,
    get_all_cart_services
}
