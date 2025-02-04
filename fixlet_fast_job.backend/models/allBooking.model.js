const mongoose = require("mongoose");
const { fixlet_fast_user_data_base_name } = require("../src/constant.js");

// 🔹 Remove `useNewUrlParser` and `useUnifiedTopology` (not needed anymore)
const remoteDBConnection = mongoose.createConnection(`${process.env.MONGODB_URL}/${fixlet_fast_user_data_base_name}`);

remoteDBConnection.on("connected", () => console.log("Connected to remote database"));
remoteDBConnection.on("error", (err) => console.error("Remote DB connection error:", err));

const allBookSchema = new mongoose.Schema({  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  orderId: { type: String, required: true },
  serviceType: { type: String, required: true },
  products: [{
    serviceName: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", index: true },
    subService: [{
      subServiceId: { type: mongoose.Schema.Types.ObjectId, required: true },
      subServiceName: { type: String, required: true },
      subServiceImage: { type: String, required: true },
      serviceTime: { type: Number, required: true },
      included: {
        type: [String],
        required: true,
        validate: { validator: (arr) => arr.length > 0, message: "Included items cannot be empty." }
      },
      note: {
        type: [String],
        required: true,
        validate: { validator: (arr) => arr.length > 0, message: "Excluded items cannot be empty." }
      },
      quantity: { type: Number, default: 1 },
      totalPrice: { type: Number }
    }]
  }],
  date: { type: String, required: true },
  status: { type: String, default: "Pending" },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

// 🔹 Use `.model()` with `remoteDBConnection`
const AllBooking = remoteDBConnection.model("MyBooking", allBookSchema);

module.exports = AllBooking;
