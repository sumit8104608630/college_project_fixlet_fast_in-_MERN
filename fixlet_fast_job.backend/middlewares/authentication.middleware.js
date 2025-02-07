const {setUser,getUser,refresh_token} =require("../services/authenticate.service.js");
const UserJob=require("../models/userJob.model");
const {verify}=require("jsonwebtoken");

const checkAuthenticationCookie=(cookieName)=>{
   return async(req,res,next)=>{
     try {
        const cookie=req.cookies[cookieName];
        if(!cookie) return res.status(401).json({message:"Unauthorized"});
        const user=await getUser(cookie);
        if(user.error){
            const refreshToken=req.cookies.refresh_token;
            if(!refreshToken){
                return res.status(401).json({message:"Unauthorized"});
            }
            const {id}=await verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            if(!id){
                return res.status(401).json({ message: "your token has been expired" });
              }
            const userFromDB=await UserJob.findById(id).select("-password -salt -salt -refreshToken ")
            const newAccessToken=await setUser(userFromDB);
            const newRefreshToken=await refreshToken(userFromDB);
            req.user=userFromDB

            res.status(200).cookie('accessToken',newAccessToken,{
                httpOnly:true,
                secure:true,
            }).cookie("refresh_token",newRefreshToken,{
                httpOnly:true,
                secure:true,
            }).json(new ApiResponse(200,loginUser,"user logged in successfully"))}

            else{
                if(!user||user.id){
                    return res.status(401).json({message:"Unauthorized"});
                }
                const currentUserDetail = await UserJob.findById(user.id).select("-password -salt");
                if (!currentUserDetail) {
                  return res.status(404).json({ message: "User not found." });
                }
                      // Attach user details to the request object
                req.user = currentUserDetail;
                next(); // Proceed to the next middleware/route handler
            }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error." });

    }
   }
}

    
module.exports={
    checkAuthenticationCookie
}