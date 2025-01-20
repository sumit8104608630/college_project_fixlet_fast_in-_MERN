const User = require("../model/user.model.js");
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const Service=require("../model/service.model.js")

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


 const searchFunctionality=   asyncHandler( async (req, res) => {
    const { query } = req.query; // Get the search keyword from query parameters
  console.log(query)
    try {
        if(query==""){
            return res.status(200).json(new ApiResponse(200,[],"No search query provided"))
        }
      const results = await Service.aggregate([
        {
          $match: {
            $or: [
              { serviceType: { $regex: query, $options: "i" } }, // Match serviceType
              { serviceName: { $regex: query, $options: "i" } }, // Match serviceName
              { servicePartName: { $regex: query, $options: "i" } }, // Match servicePartName
            ]
          },
        },
        {
            $group: {
              _id: "$serviceType",               // Group by serviceType
              serviceTypeName:{$first:"$serviceTypeName"},
              services: {
                $push: {
                  serviceName: "$serviceName",
                  serviceImage: "$serviceImage",
                },
              },
            },
          },
        { $sort: { rating: -1, reviewCount: -1, price: 1 } }, // Sort by rating, reviews, and price
        { $limit: 5 } // Limit to top 10 results
      ]);
  
      res.json(results);
    } catch (error) {
      console.error("Error in search aggregation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


module.exports={
    no_of_user_globally,
    searchFunctionality
}