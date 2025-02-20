import mongoose from "mongoose";
// let's create schema for cart

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index:true
    },


    products:[{
        serviceId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service",
            index:true
        },
        serviceType: {
          type: String,
          required: [true, "Service Type is required"],
        },
        serviceTypeName:{
          type:String,
          required:[true,"Service Name is required"]
        },
      
        serviceName: {  
            type: String,
            required: true,
          },
     
        subServices:[{
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
}]
},
{
    timestamps:true  
})
  
const Cart=mongoose.model("Cart",cartSchema);

export default Cart;