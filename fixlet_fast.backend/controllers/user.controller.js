 const {asyncHandler}=require("../utils/asyncHandler.js");
// let's require the api error for error message 
 const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
 const User = require("../model/user.model.js");
// let require cookie for saving token into the cookie
const cookie=require("cookie-parser");
// otp  model
const EmailOtp =require("../model/emailOTP.model.js")
// nodemailer
const nodemailer=require("nodemailer")

const { createHmac, randomBytes } = require("node:crypto");
const crypto = require('crypto');



const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // Adjust the URL based on your Redis setup
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();



 const userRegister=asyncHandler(async(req,res)=>{
// let's break out the step for register 
/*
1.get user detail from post man
2.check validation all possible validation
3.check if user already exist
4. user object because mongo db is non sql data base
5.also remove the password from token  
6. return res
*/

    try{
      const {fullName,email,password}=req.body;
        if([fullName,email,password].some(property=>property?.trim()==="")){
            throw new apiError("please fill all the field",400,)
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            throw new apiError("user already exist",400)
        }
        const userObject={
            fullName:fullName,
            email:email,
            password:password,
        }
        if(!userObject){
            throw new apiError("user object is empty",400)
        }
        const createUser=await User.create(userObject);
       const isUserCreated=await User.findById(createUser._id).select("-password -salt -refreshToken")
       if(!isUserCreated){
        throw new apiError("user not created",500)
       }
        return res.status(201).json( new ApiResponse(200,isUserCreated,"user created successfully"))
  
    }
    catch(error){
        console.log(error);
    }
 })














/*
 const generateOtp=asyncHandler(async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            throw new apiError("please fill all the field",400)
        }
        const emailOtp=await EmailOtp.findOne({email})   
         const OTP = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

        const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const salt = randomBytes(16).toString("hex");
        const hashOtp = createHmac("sha256", salt).update(OTP.toString()).digest("hex");
        
        if (emailOtp) {
          await EmailOtp.findOneAndUpdate(
            { email },
            {
              $set: {
                otp: hashOtp, // Set hashed OTP
                salt: salt,   // Set the new salt
                expireTime: expireTime, // Update expiry time
              },
            }
          );
        }
        
        else{
            const emailOtpObject={
                email:email,
                otp:OTP,
                expireTime:expireTime
            }
            await EmailOtp.create(emailOtpObject);

        }
        // let's send email to user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sumit8104608630@gmail.com",
                pass: process.env.COMPANY_EMAIL_PASSWORD, // Your Gmail app password
            },
        });
        
        //Email  message configuration
        const mailOptions = {
            from: process.env.COMPANY_EMAIL, // sender address 
            to: email, 
            subject: OTP,
            text: `Your OTP is ${OTP} and it will expire in 5 minutes` //
        };
        //send email
         transporter.sendMail(mailOptions).then(()=>{
            
            return res.status(201).json( new ApiResponse(200,"OTP send successfully"))

         })

    }
    catch(error){
        console.log(error);
    }

 })

 */







 const generateOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new apiError('Please fill all the field', 400);
    }
  
    // Generate a more secure OTP
    const OTP = crypto.randomInt(1000, 9999); // More secure way to generate OTP
    const expireTime = 1 * 60; // 5 minutes expiration time (in seconds)
  
    const otpData = {
      otp: OTP.toString(),
      expiresAt: Date.now() + expireTime * 1000,
    };
  
    // Store OTP in Redis with email as the key and expiration time
    await client.set(email, JSON.stringify(otpData), { EX: expireTime });
  
    // Send OTP to email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.COMPANY_EMAIL, // Avoid hardcoding email
        pass: process.env.COMPANY_EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${OTP} and it will expire in 5 minutes.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(201).json(new ApiResponse(200, 'OTP sent successfully'));
    } catch (err) {
      res.status(500).json(new apiError('Error sending email', 500));
    }
  });
  
  
  const verify_otp = asyncHandler(async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        throw new apiError('Please fill all the fields', 400);
      }
  
      // Get OTP from Redis
      const storedOtpData = await client.get(email);
      if (!storedOtpData) {
        throw new apiError('OTP has expired or is not valid', 400);
      }
  
      const { otp: storedOtp, expiresAt } = JSON.parse(storedOtpData);
  
      // Check if OTP is expired
      if (Date.now() > expiresAt) {
        throw new apiError('OTP has expired', 400);
      }
  
      if (storedOtp !== otp) {
        throw new apiError('Invalid OTP', 400);
      }
  
      // OTP is correct, clear OTP from Redis
      await client.del(email);
  
      res.status(200).json(new ApiResponse(200, '', 'Email verified successfully'));
    } catch (error) {
      console.log(error);
      res.status(500).json(new apiError('Internal Server Error', 500));
    }
  });
  










/*
 // let's create API to check weather the OTP is correct or not
 const verify_otp=asyncHandler(async(req,res)=>{
    try{
        const{email,otp}=req.body;
        if(!email||!otp){
            throw new apiError("please fill all the field")
        }
        const emailOtp=await  EmailOtp.findOne({email});
        if(!emailOtp){
            throw new apiError("please write correct emailID ");
        }
        const response=await EmailOtp.verify_otp(email,otp);
        if(response){
            res.status(200).json( new ApiResponse(200,"","email is verified successfully"))
        }
        else{
            throw new apiError("otp verified unsuccessful",404)
        }
    }
    catch(error){
        console.log(error);
    }
 })

*/

















// let's create the user login algorithm to create user functionality
const userLogin=asyncHandler(async(req,res)=>{
    /*
    1.get user detail from the frontend 
    2.check validation all possible validation

    */ 
    try{
        const {email,password}=req.body;
        if([email,password].some(property=>property?.trim()==="")){
            throw new apiError("please fill all the field",400)
        }
        const user=await User.findOne({email});
        if(!user){
            throw new apiError("user not found",404)
        }
      const token=await User.matchPasswordGenerateToken(email,password);
      
        const refresh_token=token?.refresh_token;
        user.refreshToken=refresh_token;
        await user.save({validateBeforeSave:false});
        const loginUser=await User.findOne({email}).select("-password -salt -refreshToken");


        const accessToken=token.token;
        res.status(200).cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:true,
        }).cookie("refresh_token",refresh_token,{
            httpOnly:true,
            secure:true,
        }).json(new ApiResponse(
            200,
        
                loginUser
            ,
            "user logged in successfully"
        ))
    }
    catch(error){
        console.log(error);
    }
});

// let's create the functionality of logout  
const userLogout=asyncHandler(async(req,res)=>{
    try{
        const {_id}=req.user._id;
        await  User.findByIdAndUpdate(_id,{
         $set:{   refreshToken:undefined}
        });

        res.status(200).clearCookie('accessToken',{
            httpOnly:true,
            secure:true,
        }).clearCookie('refresh_token',{
                httpOnly:true,
                secure:true,
        }).json(new  ApiResponse(200,"logout successfully"));

    }
    catch(error){
        console.log(error);
    }
})

const userInfo=asyncHandler(async(req,res)=>{
    try{
    const userInfo=req.user;
    if(!userInfo){
        return new ApiResponse(401,"user not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            userInfo,
            "user info",
        )
    )
    }
    catch(error){
        console.log(error);
    }

})


 module.exports={
    userRegister,
    userLogin,
    userLogout,
    userInfo,
    generateOtp,
    verify_otp
 }

