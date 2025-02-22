import  mongoose from "mongoose";


const subProductSchema = mongoose.Schema(
  {
    subProductImage:[{
      type: String,
      required: true,
    }],
    subProductName: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required: true
    },
    include:[String],
    note:[String],
    productRatingCount: {
      type: Number,
      default: 0,
      min: 0, 
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },{_id:true,index:true},
);

const productSchema = mongoose.Schema(
  {
    productType: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    productTypeName: {
      type: String,
      required: true,
    },
    serviceArea: {
      type: [String],
      default: ["mumbai", "patna", "agra", "pune"],
      validate: [areas => areas.length > 0, 'Service area cannot be empty'],
    },
    productImage: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    subProduct: [subProductSchema],
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0, 
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
