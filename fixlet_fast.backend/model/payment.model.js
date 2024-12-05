const mongoose=require("mongoose");
//let's create the schema model for the payment history and for track

const paymentSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentDate:{
        type:Date,
        default:Date.now
    },
    transactionId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// let's make the model for the schema
const Payment=mongoose.model("Payment",paymentSchema);
// let's import the model 
module.exports=Payment;