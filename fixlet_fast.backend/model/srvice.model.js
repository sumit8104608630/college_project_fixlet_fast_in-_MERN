const mongoose = require("mongoose");

// Create schema for the services
const serviceSchema = mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
    index: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  serviceSubType:{
    type:String,
    required:true
  },
  included: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Included items cannot be empty.',
    },
  },
  excluded: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Excluded items cannot be empty.',
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    required: true,
    default:0,
    },
},
 {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Create the model for the schema
const Service = mongoose.model("Service", serviceSchema);
// let's export the model
module.exports = Service;
