const mongoose=require("mongoose");
// let's create schema for cart

const productSchema=mongoose.Schema({
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
        productType: {
          type: String,
          required: [true, "Service Type is required"],
        },
        productTypeName:{
          type:String,
          required:[true,"Service Name is required"]
        },
      
        productName: {  
            type: String,
            required: true,
          },
     
        subServices:[{
            subProductId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true, // SubService is nested; you handle this in the application logic
              },
              subProductName:{
                type:String,
                required:true
              },
              subProductImage:{
                type:String,
                required:true
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
  
const ProductCart=mongoose.model("Cart",productSchema);
module.exports=ProductCart;