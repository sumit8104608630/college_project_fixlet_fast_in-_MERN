const {asyncHandler}=require("../utils/asyncHandler.js");
// let's require the api error for error message 
 const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
//let's require the cart model and service model
const Cart=require("../model/cart.model.js");
const Service=require("../model/service.model.js");
const { ObjectId } = require('mongodb');
const User =require("../model/user.model.js"); 
const Offers = require("../model/offers.model.js");
// Improved error handling using ApiResponse


const add_service_to_cart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { serviceId, subServiceId } = req.body;
        const quantity = 1;
        const offers=await Offers.findOne({serviceId:serviceId,subServiceId:subServiceId})
        let offerPrice;
        if(offers){
           offerPrice=offers.price;
        }else{
         
         offerPrice=0
        }
        console.log(offerPrice)

        const user = await User.findById(userId);
        if (!user) return res.status(400).json(new ApiResponse(400, "User not found"));

        const service = await Service.findById(serviceId);
        if (!service) return res.status(400).json(new ApiResponse(400, "Service not found")); 
        if (!service.serviceType) {
            return res.status(400).json(new ApiResponse(400, "Service Type is missing"));
        }

        const currentSubService = service.serviceSubType.find(sub => sub._id.toString() === subServiceId.toString());
        if (!currentSubService) return res.status(400).json(new ApiResponse(400, "Sub-service not found"));

        let cart = await Cart.findOne({ userId });
        if (cart) {
            const serviceIndex = cart.products.findIndex(product => product.serviceId.equals(serviceId));
            if (serviceIndex !== -1) {
                const serviceInCart = cart.products[serviceIndex];
                const subServiceIndex = serviceInCart.subServices.findIndex(sub => sub.subServiceId.toString() === subServiceId.toString());
 
                if (subServiceIndex !== -1) {
                    const subService = serviceInCart.subServices[subServiceIndex];
                    subService.quantity += quantity;
                    subService.serviceTime = Number(currentSubService.serviceTime)*Number(subService.quantity);
                    subService.totalPrice = (subService.quantity * currentSubService.price)-offerPrice*subService.quantity;
                } else {
                    const newSubService = {
                        subServiceId, 
                        subServiceName: currentSubService.subServiceName,
                        subServiceImage: currentSubService.subServiceImage,
                        serviceTime:Number(currentSubService.serviceTime)*quantity,
                        included: currentSubService.included,
                        note: currentSubService.note,
                        quantity,
                        totalPrice: (currentSubService.price * quantity)-offerPrice*quantity
                    };
                    serviceInCart.subServices.push(newSubService);
                }

                await cart.save();
                return res.status(200).json(new ApiResponse(200, cart.products, "Product added to cart"));
            } else {
                const newService = {
                    serviceId,
                    serviceType: service.serviceType,
                    serviceTypeName:service.serviceTypeName,
                    serviceName: service.serviceName,
                    subServices: [{
                        subServiceId,
                        subServiceName: currentSubService.subServiceName,
                        subServiceImage: currentSubService.subServiceImage,
                        serviceTime:Number(currentSubService.serviceTime)*quantity,
                        included: currentSubService.included,
                        note: currentSubService.note,
                        quantity,
                        totalPrice: (currentSubService.price * quantity)-offerPrice*quantity
                    }]
                };

                cart.products.push(newService);
                await cart.save();
                return res.status(200).json(new ApiResponse(200, cart.products, "Product added to cart"));
            }
        } else {
            cart = new Cart({
                userId,
                products: [{
                    serviceId,
                    serviceType: service.serviceType,
                    serviceTypeName:service.serviceTypeName,
                    serviceImage: service.serviceImage,
                    serviceName: service.serviceName,
                    subServices: [{
                        subServiceId,
                        subServiceName: currentSubService.subServiceName,
                        subServiceImage: currentSubService.subServiceImage,
                        serviceTime:Number(currentSubService.serviceTime)*quantity,
                        included: currentSubService.included,
                        note: currentSubService.note,
                        quantity,
                        totalPrice: (currentSubService.price * quantity)-offerPrice*quantity
                    }]
                }]
            });
            await cart.save();
            return res.status(201).json(new ApiResponse(201, cart.products, "Product added to cart"));
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
        const offers=await Offers.findOne({serviceId:serviceId,subServiceId:subServiceId})

        let offerPrice;
        if(offers){
           offerPrice=offers.price;
        }else{
         
         offerPrice=0
        }

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
            currentSubService.serviceTime=Number(currentSubService.serviceTime)-Number(currentSubService.serviceTime)/Number(currentSubService.quantity)

            currentSubService.quantity -= 1;
            currentSubService.totalPrice = (currentSubService.quantity * subService.price)-offerPrice*currentSubService.quantity;
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
            { $match: { userId: userId } },
            { $unwind: '$products' },
            { $unwind: '$products.subServices' },
            {
              $group: {
                _id: '$products.serviceType',
                serviceTypeName: { $first: '$products.serviceTypeName' },
                orderId:{$first:`$products._id`},
                productDetails: {
                  // Collect product details into an array
                  $push: {
                    serviceName: '$products.serviceName',
                    serviceId: '$products.serviceId',
                    subService: '$products.subServices',
                  },
                },
                totalQuantity: { $sum: '$products.subServices.quantity' },
                totalService: { $sum: 1 },
                totalPrice: { $sum: '$products.subServices.totalPrice' },
              },
            },
            { $sort: { totalQuantity: -1 } },
          ]);
          
          // Add `orderId` after the aggregation
     
          
      
          

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
  
  // let's create the checkout functionality to filter particular
  // service type and sub service type and calculate the total price and quantity of the service type and
  // sub service type
  const checkout_filter=asyncHandler(async(req,res)=>{
try {
    const { state = "maharashtra", city = "mumbai", categories } = req.query;
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
            productDetails: {
              // Collect product details into an array
              $push: {
                serviceName: '$products.serviceName',
                serviceId: '$products.serviceId',
                subService: '$products.subServices',
              },
            },
            totalQuantity: { $sum: '$products.subServices.quantity' },
            totalService: { $sum: 1 },
            totalTime:{$sum:'$products.subServices.serviceTime'},
            totalPrice: { $sum: '$products.subServices.totalPrice' },
          },
        },
        { $sort: { totalQuantity: -1 } },
      ]);

      
    
const product=await group_cart.filter(item=>item._id===categories)
    return res.status(200).json(new ApiResponse(200,product,"success"));
    
} catch (error) {
    console.log(error)
    throw new apiError("something went wrong")
}
  })
  



// lets export all functionality
module.exports={
    add_service_to_cart, 
    cancel_the_service,
    get_all_cart_services,
    checkout_filter
}
