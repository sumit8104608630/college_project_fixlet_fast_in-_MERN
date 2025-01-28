const User =require("../model/user.model.js") 
const {ApiResponse}=require("../utils/apiResponse.js")
const {apiError}=require("../utils/apiError.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const MyBooking =require("../model/myBook.model.js");

const get_all_booking=asyncHandler(async(req,res)=>{
    try {
        const userId=req.user._id;
        if(!userId){
            return res.status(404).json(new ApiResponse(404,"","unauthorized"));
        }
        //let's get the all data of my booking from the database using aggregation pipeline
        const data=await MyBooking.aggregate([
            {
              // Match specific user data if needed (optional)
              $match: { userId: userId },
            },
            {
              // Group data to calculate the totalAmount sum
              $group: {
                _id: null, // Grouping all data together (null groups everything)
                totalAmountPay: { $sum: "$totalAmount" }, // Summing up totalAmount
    
                entries: {
                  $push: {
                    _id: "$_id",
                    userId: "$userId",
                    serviceType: "$serviceType",
                    products: "$products",
                    totalAmount: "$totalAmount",
                    status:"$status",
                    date:"$date",
                    createdAt: "$createdAt",
                  },
                },
              },
            },
            {
              // Unwind entries array to sort them by date
              $unwind: "$entries",
            },
            {
              // Sort by createdAt date (descending order)
              $sort: { "entries.createdAt": 1 },
            },
           
            {
              // Group again to reshape data
              $group: {
                _id: "$_id",
                totalAmountPay: { $first: "$totalAmountPay" },
                Entries: { $push: "$entries" },
    
              },
            },
          ]);
          if(!data){
            return res.status(404).json(new ApiResponse(404,"","No data found"))
          }
          return res.json(data);
    } catch (error) {
        console.log(error);
        throw new apiError("something wentWrong",500)
    }
})


module.exports={
    get_all_booking
}