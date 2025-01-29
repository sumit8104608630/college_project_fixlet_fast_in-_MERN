const User = require("../model/user.model.js");
// let's require the api error for error message 
const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const Service=require("../model/service.model.js")
const Areas =require ("../model/area.model.js");
const nodemailer = require("nodemailer");
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
              serviceType:{$first:"$serviceType"},
              services: {
                $push: {
                  servicePartName:"$servicePartName",
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

  // let get no of cites where we provide service

const get_no_of_cities=asyncHandler(async(req,res)=>{
  try {
    const all_area=await Areas.find();
    const cities=all_area.map(item=>[...item.city]);
    const total_count=cities.flat().length
    if(!total_count){
      return res.status(200).json(new ApiResponse(200,0,"No cities found"))
    }

    return res.status(200).json(new ApiResponse(200,total_count,"No cities found"))
  } catch (error) {
      console.log(error);
      throw new apiError("something went wrong",500);
  }
})
  
// let's create a functionality to send mail

const send_mail=asyncHandler(async(req,res)=>{
  try {
      const {name,email,message}=req.body;
      console.log(name,email,message)
      if([name,email,message].some(item=>item==="")){
        return res.status(400).json(new ApiResponse(400,"","Please fill all fields",))
      }
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.COMPANY_EMAIL_PASSWORD,
              },
            });

      const mailOptions={
        from:process.env.COMPANY_EMAIL,
        to:email,
        subject:`${name}: Message`,
        text:message
      }
      try {
        await transporter.sendMail(mailOptions);
        return res.status(201).json(new ApiResponse(201,message,"success"))
      } catch (error) {
        console.log(error)
        throw new apiError("something went wrong",500)
      }

  } catch (error) {
    console.log(error)
    throw new apiError("some thing went wrong",500);
  }
})

module.exports={
    no_of_user_globally,
    searchFunctionality,
    get_no_of_cities,
    send_mail
}