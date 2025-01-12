;const mongoose=require("mongoose")

// create the model for booking

const myBookSchema=mongoose.Schema({
  userId:{
    typ:mongoose.Schema.ObjectId,
    ref:"User"
  },
  product:[
    
  ],
  date:{
    type:Date,
  },
  timeSlot:{
    type:String
  }
  }

    ,{
    timestamps: true, // Automatically adds createdAt and updatedAt
})

