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


 const generateOtp=asyncHandler(async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            throw new apiError("please fill all the field",400)
        }
        const emailOtp=await EmailOtp.findOne({email})   
         const OTP = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

        const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        if(emailOtp){
        await EmailOtp.findOneAndUpdate(
            { email }, // Filter: Match by email
            {
              $set: {
                otp: OTP,            // Update or set OTP
                expireTime: expireTime // Update expiration time
              }
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
        const transporter=nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth:{
                user:"kelsi3@ethereal.email",
                pass:"dzTsZfwgg2unsBg9y9",
            }
        });

        //Email  message configuration
        const mailOptions = {
            from: process.env.COMPANY_EMAIL, // sender address
            to: email, 
            subject: OTP,
            text: `Your OTP is ${OTP} and it will expire in 5 minutes` //
        };
        //send email
        await transporter.sendMail(mailOptions);
        return res.status(201).json( new ApiResponse(200,"OTP send successfully"))

    }
    catch(error){
        console.log(error);
    }

 })



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
    generateOtp
 }

