const mongoose=require("mongoose");

const visitationSchema=mongoose.Schema({
    serviceType:{
        type:String,
        required:true
    },
    serviceId:{
        type:mongoose.Schema.ObjectId,
        ref:"Service",
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    },
    price:{
        type:Number,
        required:true
    }
},{ timestamps:true});

const VisitationFee=mongoose.model("VisitationFee",visitationSchema);

module.exports=VisitationFee;