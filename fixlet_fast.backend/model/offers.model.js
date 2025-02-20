import mongoose from "mongoose";

const offersSchema=mongoose.Schema({
    offersTo:{
        type:String,
        default:"all"
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
    subServiceId:{
        type:String,
    },
    offerDescription:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
    }
},{timestamps: true,}
)



const Offers=mongoose.model("Offers",offersSchema);
export default Offers;