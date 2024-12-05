 const {asyncHandler}=require("../utils/asyncHandler.js");

 const userRegister=async(requestAnimationFrame,res)=>{
    try{
        res.status(200).json({
            message:"User Registered Successfully",
        })
    }
    catch(error){

    }
 }


 module.exports={
    userRegister
 }