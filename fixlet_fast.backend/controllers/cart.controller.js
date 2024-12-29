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
                        totalPrice: current_subService.price * Number(quantity)  // Calculate totalPrice with provided quantity
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
const cancel_the_service = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { serviceId, subServiceId } = req.body;

        if (!serviceId) {
            return res.status(400).json(new ApiResponse(400, "Service ID is required"));
        }

        if (!subServiceId) {
            return res.status(400).json(new ApiResponse(400, "Sub-service ID is required"));
        }

        const service = await Service.findById(serviceId).lean();
        if (!service) {
            return res.status(404).json(new ApiResponse(404, "Service not found"));
        }

        const subService = service.serviceSubType.find(
            (sub) => sub._id.toString() === subServiceId.toString()
        );
        if (!subService) {
            return res.status(404).json(new ApiResponse(404, "Sub-service not found"));
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json(new ApiResponse(404, "Cart not found"));
        }

        const productIndex = cart.products.findIndex(
            (product) => product.serviceId.toString() === serviceId.toString()
        );
        if (productIndex === -1) {
            return res.status(404).json(new ApiResponse(404, "Product not found in cart"));
        }

        const product = cart.products[productIndex];

        const subServiceIndex = product.subServices.findIndex(
            (sub) => sub.subServiceId.toString() === subServiceId.toString()
        );
        if (subServiceIndex === -1) {
            return res.status(404).json(new ApiResponse(404, "Sub-service not found in product"));
        }

        const currentSubService = product.subServices[subServiceIndex];

        if (currentSubService.quantity > 1) {
            currentSubService.quantity -= 1;
            currentSubService.totalPrice = currentSubService.quantity * subService.price;
        } else {
            product.subServices.splice(subServiceIndex, 1);
        }

        if (product.subServices.length === 0) {
            cart.products.splice(productIndex, 1);
        }

        if (cart.products.length === 0) {
            await Cart.findOneAndDelete({ userId });
        } else {
            await cart.save();
        }

        return res.status(200).json(new ApiResponse(200, "Service cancelled successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, "Something went wrong on the server"));
    }
});


const get_all_cart_services = asyncHandler(async (req, res) => {
    try {
        const userId=await req.user._id;
        if(!userId){
            return res.status(401).json(new ApiResponse(401, "Unauthorized"));
        }
        const cart =await Cart.findOne({userId:userId});
        if(!cart){
            return res.status(404).json(new ApiResponse(404, "Cart not found"));
        }
        // let make better array of object for frontend for rendering the cart and handling  using aggregation pipeline 

        const group_cart = await Cart.aggregate([
            { $unwind: "$products" },  // Unwind the products array
            { $unwind: "$products.subServices" },  // Unwind the subServices array inside each product
            {
              $group: {
                _id: "$products.serviceType",  // Group by serviceType
                productDetails: {  // Collect product details into an array
                  $push: {
                    
                  serviceName:"$products.serviceName",
                  serviceId:"$products.serviceId",
                  subService:"$products.subServices" // Include the subServices details
                  },
                },
                totalService:{$sum:1}
              }
            }
          ]);

          if(!group_cart){
            return res.status(404).json(new ApiResponse(404, "Cart not found"));
          }
          return res.status(200).json(new ApiResponse(200,group_cart,"all data of current cart"));
          
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
