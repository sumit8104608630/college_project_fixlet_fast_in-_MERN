;const mongoose=require("mongoose")

// create the model for booking

const bookSchema=mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
},{
    timestamps: true, // Automatically adds createdAt and updatedAt
})

const Book=mongoose.model("book")

