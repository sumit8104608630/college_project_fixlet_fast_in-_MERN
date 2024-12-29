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
const add_service_to_cart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { serviceId, subServiceId, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) return apiError(res, 400, "User not found");

        const service = await Service.findById(serviceId);
        if (!service) return apiError(res, 400, "Service not found");

        const current_subService = service.serviceSubType.find(sub => sub._id.toString() === subServiceId.toString());
        if (!current_subService) return  res.status(400).json({
            status: false,
        })

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Find the service in the cart
            const serviceIndex = cart.products.findIndex(product => product.serviceId.toString() === serviceId.toString());

            if (serviceIndex !== -1) {
                const serviceInCart = cart.products[serviceIndex];  // use serviceInCart instead of overwriting service variable

                // Find the subservice in the cart
                const subServiceIndex = serviceInCart.subServices.findIndex(sub => sub.subServiceId.toString() === subServiceId.toString());

                if (subServiceIndex !== -1) {
                    const subService = serviceInCart.subServices[subServiceIndex];
                    subService.quantity += Number(quantity);  // Add the quantity to the existing quantity
                    subService.totalPrice = subService.quantity * current_subService.price;  // Recalculate totalPrice
                } else {
                    const newSubService = {
                        subServiceId,
                        subServiceName: current_subService.subServiceName,
                        subServiceImage: current_subService.subServiceImage,
                        included: current_subService.included,
                        note: current_subService.note,
                        quantity:Number(quantity),
                        totalPrice: current_subService.price * Number(quantity)  // Use the provided quantity
                    };
                    serviceInCart.subServices.push(newSubService);
                }

                await cart.save();
                return res.status(200).json(new ApiResponse(200, cart.products, "Product successfully added to the cart"));
            } else {
                // If service doesn't exist, add it to the cart
                const newService = {
                    serviceId,
                    serviceType: service.serviceType,
                    serviceName: service.serviceName,
                    subServices: [{
                        subServiceId,
                        subServiceName: current_subService.subServiceName,
                        subServiceImage: current_subService.subServiceImage,
                        included: current_subService.included,
                        note: current_subService.note,
                        quantity:Number(quantity),
                        totalPrice: current_subService.price * Number(quantity)  // Calculate totalPrice with provided quantity
                    }]
                };

                cart.products.push(newService);
                await cart.save();
                return res.status(200).json(new ApiResponse(200, cart.products, "Product successfully added to the cart"));
            }
        } else {
            // If no cart exists, create a new one
            cart = new Cart({
                userId,
                products: [{
                    serviceId,
                    serviceType: service.serviceType,
                    serviceImage: service.serviceImage,
                    serviceName: service.serviceName,
                    subServices: [{
                        subServiceId,
                        subServiceName: current_subService.subServiceName,
                        subServiceImage: current_subService.subServiceImage,
                        included: current_subService.included,
                        note: current_subService.note,
                        quantity:Number(quantity),
                        totalPrice: current_subService.price * current_subService.quantity  // Calculate totalPrice with provided quantity
                    }]
                }]
            });

            await cart.save();
            return res.status(201).json(new ApiResponse(201, cart.products, "Product successfully added to the cart"));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, "Something went wrong. Please try again"));
    }
});

 
// now let's create the functionality the cancellation  of the service 

const cancel_the_service=asyncHandler(async(req,res)=>{
    try {

        const userId=req.user._id;
        const {serviceId,subServiceId}=req.body;

        if(!serviceId){
            return res.status(400).json(new ApiResponse(400,"service id is required"));
        }

        if(!subServiceId){
            return res.status(400).json(new ApiResponse(400,"sub service id is required"));
        }
        const service =await Service.findById(serviceId);
        const subService =await service.serviceSubType.find((sub)=>sub._id.toString()===subServiceId.toString());


        const cart = await Cart.findOne({userId:userId});
        if(!cart){
            return res.status(404).json(new ApiResponse(404,"cart not found"))
        } 
        const productIndex =await cart.products.findIndex((product)=>product.serviceId.toString()===serviceId.toString());
  
        const product=cart.products[productIndex];
        if(product){
            const subServiceLength=product.subServices.length;
            if(subServiceLength===1){
                cart.products.splice(productIndex,1);
            }
            else{
               const subServiceIndex=await product.subServices.findIndex(product=>product.subServiceId.toString()===subServiceId.toString());
               if (subServiceIndex === -1) {
                return res.status(404).json(new ApiResponse(404, "Sub-service not found in the cart"));
            }
               const currentSubService= await product.subServices[subServiceIndex];
               if(currentSubService.quantity>1){
                currentSubService.quantity-=1
                currentSubService.totalPrice=currentSubService.quantity*subService.price
               }
               else{
                    product.subServices.splice(subServiceIndex,1);
               }
            }
            if (product.subServices.length === 0) {
                cart.products.splice(productIndex, 1);
            }
        }
     
        await cart.save();
        return res.status(200).json(new ApiResponse(200,"service cancelled successfully"))
        
    } catch (error) {
        console.log(error)
        return apiError("something went wrong in server",500);
    }
})

const get_all_cart_services = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"));
      }
  
      // Check if the cart exists for the user
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json(new ApiResponse(404, "Cart not found"));
      }
  
      // Aggregate to group cart products by serviceId and include subserviceId
      const cartServicesGrouped = await Cart.aggregate([
        {
          $match: { userId } // Filter by the specific user's cart
        },
        {
          $unwind: "$products" // Deconstruct the products array
        },
        {
          $group: {
            _id: "$products.serviceId", // Group by serviceId
            products: { $push: "$products" }, // Collect products under the same serviceId
            subserviceIds: { $addToSet: "$products.subserviceId" } // Collect unique subserviceIds
          }
        },
      ]);
  
      // Return the grouped services
      return res.status(200).json({
        status: 200,
        message: "Cart services fetched successfully",
        data: cartServicesGrouped
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Something went wrong in the server"));
    }
  });
  



// lets export all functionality
module.exports={
    add_service_to_cart, 
    cancel_the_service,
    get_all_cart_services
}
