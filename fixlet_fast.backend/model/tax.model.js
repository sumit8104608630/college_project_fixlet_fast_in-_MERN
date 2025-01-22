const mongoose=require("mongoose");
const taxSchema=mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    tax:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Tax=mongoose.model("Tax",taxSchema);
module.exports=Tax;


