import  mongoose from "mongoose";


// let's create the schema for review of customer

const reviewSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true,
    },
    reviewText:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    }

},{
    timestamps:true
});

//no we create model for schema
const Review=mongoose.model("Review",reviewSchema);
// let's export this model
export default Review;