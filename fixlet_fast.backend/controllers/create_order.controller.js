const Razorpay = require("razorpay");
const { apiError } = require("../utils/apiError.js");
const { ApiResponse } = require("../utils/apiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const crypto = require("crypto");
const PaymentHistory=require("../model/payment.model.js")
const Cart =require("../model/cart.model.js")
const nodemailer = require("nodemailer");

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
      amount: amount, 
      currency,
      receipt,
    };

    const orderId = await razorpay.orders.create(options);
    return res.status(201).json(new ApiResponse(201, orderId, "Order created successfully"));
  } catch (error) {
    console.log(error);
    throw apiError(error.message, 500);
  }
});

const verify_payment = asyncHandler(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceDetail, date,categories } = req.body;
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


      return res.status(200).json(new ApiResponse(200, { message: "Payment verified successfully" }, "success"));
    } else {
      return res.status(400).json(new ApiResponse(400, "", "Invalid payment signature"));
    }
  } catch (error) {
    console.error("Error in verify_payment:", error);
    return res.status(500).json(new ApiResponse(500, "", "Internal Server Error"));
  }
});

module.exports = {
  create_order_id,
  verify_payment
};
