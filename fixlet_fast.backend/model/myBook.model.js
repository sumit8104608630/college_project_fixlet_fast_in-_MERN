import mongoose from "mongoose";

// create the model for booking

const myBookSchema=mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
         index:true
     },
     orderId:{
      type:String,
      required:true
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
   
     date:{
      type:String,
      required:true
     },
     status:{
       type:String,
       default:"Pending"
     },
     totalAmount:{
         type:Number,
         required:true
     },
 },{
     timestamps:true
 })


 const MyBooking=mongoose.model("MyBooking",myBookSchema);
 export default MyBooking;
