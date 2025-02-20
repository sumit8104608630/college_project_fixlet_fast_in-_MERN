import mongoose from "mongoose";
// let's create the model for the schema

const contactSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneCode:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{ timestamps:true})

// let's create model for this schema 
const Contact=mongoose.model("Contact",contactSchema);
export default Contact;