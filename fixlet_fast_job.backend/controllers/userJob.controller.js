const UserJob=require("../models/userJob.model");
const {ApiError}=require("../utils/ApiError.js");
const {ApiResponse}=require("../utils/ApiResponse.js")
const {asyncHandler}=require("../utils/asyncHandler.js");
const nodemailer=require("nodemailer")
const crypto = require("crypto");
const {uploadFile}=require("../utils/cloudinary")
const path=require("path");
const cookie=require("cookie-parser");


// let's first crate the full functionality for the userJob authentication

// let's first implement mail otp send and verification function
const redis=require("redis")
const client=redis.createClient({
    url:process.env.REDIS_URL||'redis://localhost:6378'
});

client.on('error',(error)=>console.log('redis client error',error));
client.connect();

const generate_otp=asyncHandler(async(req,res)=>{
    try {
        const {email}=req.body;
        const OTP=crypto.randomInt(1000,9999);
        const expireTime=1*60;


        const otpData={
            otp:OTP.toString(),
            expireTime:Date.now()+expireTime*1000,
        }
        // sending otp in redis with email as the key and expiration time
        await client.set(email,JSON.stringify(otpData),{EX:expireTime});
        // sending otp via email

        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.COMPANY_EMAIL, // Avoid hardcoding email
                pass: process.env.COMPANY_EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.COMPANY_EMAIL,
            to: email,
            subject: 'Your OTP Code - Fixlet Fast',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                
                <h2 style="text-align: center; color: #f97316;">Fixlet Fast - OTP Verification</h2>
          
                <p style="color: #374151; font-size: 16px;">Dear User,</p>
          
                <p style="color: #374151; font-size: 16px;">
                  Your One-Time Password (OTP) for verification is:
                </p>
          
                <p style="text-align: center; font-size: 24px; font-weight: bold; color: #f97316; border: 2px dashed #f97316; padding: 10px; display: inline-block; margin: 20px auto;">
                  ${OTP}
                </p>
          
                <p style="color: #374151; font-size: 16px;">
                  This OTP will expire in <strong>1 minutes</strong>. Please do not share it with anyone.
                </p>
          
                <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 20px;">
                  Thank you for using Fixlet Fast!
                </p>
              </div>
            `,
          };
          
       try{
        await transporter.sendMail(mailOptions);
        res.status(201).json(new ApiResponse(200,"",'OTP sent successfully'));
       }
       catch(err){
        console.log(err);
        res.status(500).json(new ApiResponse(500,"",'Error'));
       }

    } catch (error) {
        console.log(error);
        throw new ApiError(500,"something went wrong");
    }
})


//let's save the data of user in mongo db
const registration=asyncHandler(async(req,res)=>{
  try {
    const {fullName,email,phoneCode,phoneNumber,password,specialized,jobType,AadhaarCardNumber}=req.body;   
    if([fullName,email,phoneNumber,password,specialized,jobType,AadhaarCardNumber].some(item=>item==="")){
      return res.status(400).json(new ApiResponse(400,"",'Please fill all the fields'));
    } 
    if(!req.file.filename){
      return res.status(400).json(new ApiResponse(400,"",'Please upload your profile picture'));
    }
    const local_path=path.join(__dirname,`../public/upload/${req.file.filename}`);
    const upload=await uploadFile(local_path);
    
    const user=await UserJob.create(
      {fullName,profilePhoto:upload.secure_url,email,phoneCode,phoneNumber,password,specialized,jobType,AadhaarCardNumber}
    ) 
    
    res.status(201).json(new ApiResponse(200,user,'User created successfully'));
  } catch (error) {
    console.log(error)
    throw new ApiError(500,"some thing went wrong")
  }
})

//let's create login functionality
const user_login=asyncHandler(async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email||!password){
      return res.status(400).json(new ApiResponse(400,"",'Please fill all the fields'));
    }
    
  } catch (error) {
    console.log(error);
    throw new ApiError(500,"something went wrong");
  }
})





module.exports={
    generate_otp,
    registration
}