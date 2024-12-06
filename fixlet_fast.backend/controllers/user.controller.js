 const {asyncHandler}=require("../utils/asyncHandler.js");
// let's require the api error for error message 
 const {apiError}=require("../utils/apiError.js")
// let's require the api response for error message 
const {ApiResponse}=require("../utils/apiResponse.js")
 const User = require("../model/user.model.js");




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

// let's create the user login algorithm to create user functionality
const userLogin=asyncHandler(async(req,res)=>{
    /*
    1.get user detail from the frontend
    2.check validation all possible validation
    
    */ 
    try{

    }
    catch(error){
        console.log(error);
    }
})

 module.exports={
    userRegister
 }

