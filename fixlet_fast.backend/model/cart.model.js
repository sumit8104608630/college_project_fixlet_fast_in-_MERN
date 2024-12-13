const mongoose=require("mongoose");
// let's create schema for cart

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    }
},
{
    timestamps:true
})
