const mongoose=require("mongoose");

const offersSchema=mongoose.Schema({
    serviceId:{
        type:String,
    },
    subServiceId:{
        type:String,
    },
    offer:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number,
    }
},{timestamps: true,}
)



const Offers=mongoose.model("Offers",offersSchema);
module.exports = Offers;