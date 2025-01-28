const Razorpay = require("razorpay");
const { apiError } = require("../utils/apiError.js");
const { ApiResponse } = require("../utils/apiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const crypto = require("crypto");
const PaymentHistory=require("../model/payment.model.js")
const Cart =require("../model/cart.model.js")
const nodemailer = require("nodemailer");
const MyBooking=require("../model/myBook.model.js")
const moment = require("moment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const create_order_id = asyncHandler(async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    
    if (!amount || !receipt) {
      return res.status(400).json(new ApiResponse(400, "", "Amount or receipt is missing"));
    }

    const options = {
      amount: parseInt(amount), 
      currency,
      receipt,
    };

    const orderId = await razorpay.orders.create(options);
    return res.status(201).json(new ApiResponse(201, orderId, "Order created successfully"));
  } catch (error) {
    console.log(error);
    throw new apiError(error.message, 500);
  }
});

const verify_payment = asyncHandler(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,serviceType, serviceDetail, date,formateDate,categories } = req.body;
    const { email } = req.user;
    const userId=req.user._id
    if(!userId){
        return res.status(400).json(new ApiResponse(400, "", "User id is missing"))
    }
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !serviceDetail || !date) {
      return res.status(400).json(new ApiResponse(400, "", "Missing required fields"));
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.COMPANY_EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: "Payment Confirmation - Fixlet Fast",
        text: `Your payment of ₹${serviceDetail.totalPrice} has been successfully completed. 
                Date Allotted: ${date?.day || "N/A"} / ${date?.date || "N/A"} / ${date?.time || "N/A"}`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Payment confirmation email sent to:", email);
      } catch (mailError) {
        console.error("Failed to send email:", mailError);
      }




     const cart = await Cart.findOne({userId:userId});
     console.log(categories)
     cart.products =  await cart.products.filter(item=>item.serviceType!==categories);
     await cart.save()
     await PaymentHistory.create({userId:userId,serviceType:serviceType,products:serviceDetail.productDetails,status:"success",totalAmount:serviceDetail.totalPrice});

     const parsedDate = moment(formateDate, "YYYY-M-D h:mm A").format("YYYY-MM-DDTHH:mm:ss"); // This will convert it to ISO format
     await MyBooking.create({userId:userId,serviceType:serviceType,products:serviceDetail.productDetails,date:parsedDate,totalAmount:serviceDetail.totalPrice}) 




      return res.status(200).json(new ApiResponse(200, { message: "Payment verified successfully" }, "success"));
    } else {
      return res.status(400).json(new ApiResponse(400, "", "Invalid payment signature"));
    }
  } catch (error) {
    console.error("Error in verify_payment:", error);
    return res.status(500).json(new ApiResponse(500, "", "Internal Server Error"));
  }
});


// let's make functionality for payment history;

const get_payment_history=asyncHandler(async(req,res)=>{
  try {

      const userId=req.user._id;
      const limit = parseInt(req.query.limit) || 5;
      const skip = parseInt(req.query.skip) || 0;  // Default to 0 (start from the beginning)
      if(!userId){
        return res.status(404).json(new ApiResponse(404,"","unauthorized"));
      }
      
      const aggregatedData = await PaymentHistory.aggregate([
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
        { $skip: skip },
        {
          // Limit the search to 5 entries
          $limit: limit,
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
      

      return res.status(200).json(new ApiResponse(200,aggregatedData,"success"));

  } catch (error) {
      console.log(error);
      throw apiError("something went wrong",500)
  }
})



module.exports = {
  create_order_id,
  verify_payment,
  get_payment_history
};
