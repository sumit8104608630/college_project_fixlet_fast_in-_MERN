const mongoose = require("mongoose");

// Create schema for the services
const serviceSchema = mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
    index: true,
  },
  serviceImage: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  servicePartName: {
    type: String,
    required: true,
  },
  serviceSubType: [
    {
      // Explicitly define the _id
      subServiceImage: {
        type: String,
        required: true,
      },
      subServiceName: {
        type: String,
        required: true,
      },
      serviceTime: {
        type: Number,
        required: true,
      },
      serviceRatingCount: {
        type: Number,
        default: 0,
      },

      price: {
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

    },{_id:true,index:true},
  ],


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
  },
  availability: { type: Boolean, default: true },
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Create the model for the schema
const Service = mongoose.model("Service", serviceSchema);
// let's export the model
module.exports = Service;
