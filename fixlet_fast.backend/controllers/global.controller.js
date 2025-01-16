const User = require("../model/user.model.js");
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");


const no_of_user_globally=asyncHandler(async(req,res)=>{

    try {
        const user_count= await User.aggregate([
            {$group:{
                _id:null,
                totalUser:{$sum:1}
            }}
        ])
        return res.status(200).json(new ApiResponse(200,user_count[0],"User count globally"));
    } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500)
    }
})


module.exports={
    no_of_user_globally
}