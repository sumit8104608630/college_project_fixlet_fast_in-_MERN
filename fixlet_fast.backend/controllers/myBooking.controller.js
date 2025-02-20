import User from "../model/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import MyBooking from "../model/myBook.model.js";


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

// let's write the cancel booking function 
const cancel_booking=asyncHandler(async(req,res)=>{
    try {
        const {bookingId}=req.body;
        const userId=req.user._id;
        if(!bookingId){
            return res.status(400).json(new ApiResponse(400,"","Please provide booking id"))
        }
        if(!userId){
            return res.status(400).json(new ApiResponse(400,"","unauthorized"))
        }
        const deletedBooking = await MyBooking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        return res.status(201).json(new ApiResponse(201,"","deleted the booking"))
    } catch (error) {
       console.log(error);
       throw new apiError("something wentWrong",500)
    }
})


export {
  get_all_booking,
  cancel_booking
};
