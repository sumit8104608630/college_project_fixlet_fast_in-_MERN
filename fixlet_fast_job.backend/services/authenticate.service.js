// let's get the jwt
const jwt=require("jsonwebtoken");
const secretKey = process.env.JWT_SECRETE; // this is the secret key used to sign the token

const setUser=(user)=>{
    if(!user){
        return {error:"User not found"};
    }
    const payLoad={
        id:user.id,
    };
    const token=jwt.sign(payLoad,secretKey,{
        expiresIn:process.env.EXPIRE,
    })
    return token
}

const refresh_token=async(user)=>{
        if(!user){
            return {error:"user not found"};
        }
        const payLoad={
            id:user._id,
        };
        const refresh_token=jwt.sign(payLoad,process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_EXPIRE
        });
        return refresh_token;
}


const getUser=async(token)=>{
    try {
        if(token){
            const decoded=await jwt.verify(token,secretKey);
            if(!decoded){
                return {error:"Invalid token"};
            }
            return decoded;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error)
    }   
}

module.exports={
    setUser,
    refresh_token,
    getUser
}