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

      
      

      const generateBillHTML = (billData) => {
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            
            <h2 style="text-align: center; color: #f97316;">Fixlet Fast - Invoice</h2>
      
            <p style="color: #374151; font-size: 16px;"><strong>Invoice ID:</strong> ${razorpay_order_id}</p>
            <p style="color: #374151; font-size: 16px;"><strong>Service Type:</strong> ${billData.serviceTypeName}</p>
      
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background: #f97316; color: white;">
                  <th style="padding: 10px; text-align: left;">Image</th>
                  <th style="padding: 10px; text-align: left;">Sub Service</th>
                  <th style="padding: 10px; text-align: center;">Time</th>
                  <th style="padding: 10px; text-align: center;">Quantity</th>
                  <th style="padding: 10px; text-align: right;">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${billData.productDetails.map(product => `
                  <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 10px;">
                      <img src="${product.subService.subServiceImage}" alt="${product.subService.subServiceName}" style="width: 60px; height: 60px; border-radius: 4px;">
                    </td>
                    <td style="padding: 10px; color: #374151;">
                      ${product.subService.subServiceName}
                    </td>
                    <td style="padding: 10px; text-align: center; color: #374151;">
                      ${Math.floor(product.subService.serviceTime / 60)}h ${product.subService.serviceTime % 60}m
                    </td>
                    <td style="padding: 10px; text-align: center; color: #374151;">
                      ${billData.totalQuantity}
                    </td>
                    <td style="padding: 10px; text-align: right; color: #f97316; font-weight: bold;">
                      ₹${billData.totalPrice}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
      
            <p style="text-align: right; font-size: 18px; color: #f97316; font-weight: bold; margin-top: 20px;">
              Total Price: ₹${billData.totalPrice}
            </p>
      
            <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 20px;">
              Thank you for choosing Fixlet Fast!
            </p>
          </div>
        `;
      };
      
      // Example Usage:
      const billHTML = generateBillHTML(serviceDetail);
      


      // Example Usage:
      

      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: "Payment Confirmation - Fixlet Fast",
        html: billHTML
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
     await MyBooking.create({userId:userId,orderId:razorpay_order_id,serviceType:serviceType,products:serviceDetail.productDetails,date:parsedDate,totalAmount:serviceDetail.totalPrice}) 




      return res.status(200).json(new ApiResponse(200, serviceDetail, "success"));
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
          $sort: { "entries.createdAt": -1 },
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
