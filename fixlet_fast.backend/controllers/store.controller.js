const Product =require("../model/product.model.js");
const {asyncHandler} =require ("../utils/asyncHandler");
const {ApiResponse} =require("../utils/apiResponse");
const {apiError} =require ("../utils/apiError");
const product =require("../component/store/store.js")

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

        
        
    } catch (error) {
        console.log(error);
        throw new apiError("something went wrong in server",500)
    }
})

module.exports={
    set_all_product
}