const mongoose=require("mongoose");
//let's create the schema model for the payment history and for track

const paymentSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    serviceType:{
      type:String,
      required:true
     },
    products:[{
        
        serviceName: {  
            type: String,
            required: true,
          },
            serviceId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Service",
                index:true
            },

         
            subService:[{
                subServiceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true, // SubService is nested; you handle this in the application logic
                  },
                  subServiceName:{
                    type:String,
                    required:true
                  },
                  subServiceImage:{
                    type:String,
                    required:true
                  },
                  serviceTime:{
                    type: Number,
                    required: true,
                  },
    
                  included: {
                    type: [String],
                    required: true,
                    validate: {
                      validator: (arr) => arr.length > 0,
                      message: "Included items cannot be empty.",
                    },
                  },
                  note: {
                    type: [String],
                    required: true,
                    validate: {
                      validator: (arr) => arr.length > 0,
                      message: "Excluded items cannot be empty.",
                    },
                  },
                quantity:{
                    type:Number,
                    default:1,
                },
                totalPrice:{
                    type:Number,
                     
                }
            }
            ],
    }],
    status:{
      type:String,
      required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
},{
    timestamps:true
})

// let's make the model for the schema
const Payment=mongoose.model("Payment",paymentSchema);
// let's import the model 
module.exports=Payment;