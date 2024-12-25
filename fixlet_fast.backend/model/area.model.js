const mongoose=require("mongoose");

const areaSchema=mongoose.Schema({
    state:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:[String],
        required:true
    }
})

const Area=mongoose.model("Area",areaSchema);
module.exports=Area;
