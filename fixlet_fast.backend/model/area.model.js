import mongoose from "mongoose";

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

export default Area;
