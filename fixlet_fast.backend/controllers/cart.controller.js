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
            const product =await cart.products.findIndex((product)=>product._id.toString()===subServiceId.toString());
            if(product){
                cart.products[product].quantity+=quantity;
                cart.products[product].totalPrice = cart.product[product].quantity*subService.price;
            }
            else{
                cart.products.push({
                    serviceId:serviceId,
                })
            }

        }
       

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong please try again"))
    }
})