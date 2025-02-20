import Product from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import product from "../component/store/store.js";


const set_all_product=asyncHandler(async(req,res)=>{
try {
    const storeData=[...product]
    const store=await Product.insertMany(storeData);
    res.json(store);


} catch (error) {
    console.log(error)
    throw new apiError("something went wrong in server",500)
}
})

const get_all_store_data=asyncHandler(async(req,res)=>{
    try {
        const { state = "maharashtra", city = "mumbai" } = req.query;

    const all_product=await Product.find();
    console.log(all_product) 
    if(!all_product){
        return res.json({message:"no product found"})
    }    
    return res.status(200).json(new ApiResponse(200,all_product,"success"))   
        
    } catch (error) {
        console.log(error);
        throw new apiError("something went wrong in server",500)
    }
})

export {
    set_all_product,
    get_all_store_data
};
