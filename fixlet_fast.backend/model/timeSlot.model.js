const mongoose=require("mongoose");
// let's create the model for time for different date 


const timeSchema=mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    times:[{
        type:String,
        required:true
    }]
},{ timestamps:true});

const TimeSlot=mongoose.model("TimeSlot",timeSchema);

module.exports=TimeSlot