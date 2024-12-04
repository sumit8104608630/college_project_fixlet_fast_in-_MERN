// let's get the jwt 
const jwt=require("jsonwebtoken");
const secret=process.env.SECRET;
const User=require("../model/user.model.js")

const setUser=(user)=>{
    if(!user){
        return {error:"user not found"};
    }
    const payLoad={
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role
    };
    const token=jwt.sign(payLoad,secret);
    return token;
}

// let's write the code for getUser function 
// basically i am putting user info in req.user object for basic crud operation
const getUser=async (token)=>{
    try{
        if(token){
            const payLoad=await jwt.verify(token,secret);
            return payLoad
        }
        else{
            return null
        }
    }
    catch(error){
        console.log(error);
        
    }
}



module.exports={
    setUser,
    getUser
}