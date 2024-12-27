const mongoose=require("mongoose");
// let's create schema for cart

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index:true
    },
    products:[{
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        index:true
    },
    subServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // SubService is nested; you handle this in the application logic
      },
    quantity:{
        type:Number,
        default:1,
    },
    totalPrice:{
        TYPE:Number,
        default:0 
    }
}]
},
{
    timestamps:true  
})
  
const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;