const mongoose=require("mongoose");
// let's create the schema for this
const bcrypt =require("bcrypt");
const {}=require("../db/connection.js");
const { setUser, refresh_token } = require("../services/authenticate.service.js");

const userJobSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneCode:{
        type:String,
        default:"+91"
    },
    phoneNumber:{
        type:String,
        required:true,
        unique: true,
        },
    password: {
        type: String,
        required: true
    },
    specialized:[String],
    jobType:{
        type:String,    
        required:true,
    },
    AadhaarCardNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 12, // ✅ Ensures minimum length of 12 characters
        maxlength: 12, // ✅ Ensures maximum length of 12 characters
        match: /^[0-9]{12}$/, // ✅ Ensures it contains exactly 12 digits
      },
      refresh_token:{
        type:String,
        required: true,
      }

},
{
    timestamps:true
})



userJobSchema.pre('save',async function(next){
    try {
        const userJob = this;
        if(!userJob.isModified("password")){
            return next();
        }
        const hashedPassword = await bcrypt.hash(userJob.password, 10);
        this.password=hashedPassword
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

userJobSchema.static("matchPasswordGenerateToken",async function(email,password){
try {
    // get the user
    const userJob=await this.findOne({email:email});
    if(!userJob){
        throw new Error("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, userJob.password);
    if(!isMatch){
        throw new Error("Password is incorrect");
    }
    else{
        const token=await setUser(userJob);
        const refreshToken= await refresh_token(userJob)
        return {token,refreshToken};
    }
} catch (error) {
    console.log(error)
}
})



const UserJob=mongoose.model("UserJob",userJobSchema);
module.exports=UserJob;