const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0, // Discount in percentage
    },
    averageRating: {
      type: Number,
      default: 0, // Scale of 0 to 5
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
