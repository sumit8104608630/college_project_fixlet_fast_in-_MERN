const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { apiError } = require("../utils/apiError");

const emailOtpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  expireTime: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // Default expiry in 5 minutes
    index: { expires: "5m" }, // Automatically delete after 5 minutes
  },
});

// Pre-save hook to hash OTP
emailOtpSchema.pre("save", async function (next) {
  if (this.isModified("otp")) { // Only hash if OTP is modified
    const salt = randomBytes(16).toString("hex");
    const hashOtp = createHmac("sha256", salt).update(this.otp).digest("hex");
    this.salt = salt;
    this.otp = hashOtp;
  }
  next();
});

// Pre-hook for findOneAndUpdate to hash OTP
emailOtpSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update && this._update.otp) {
    const salt = randomBytes(16).toString("hex");
    const hashOtp = createHmac("sha256", salt).update(this._update.otp).digest("hex");
    this._update.salt = salt;
    this._update.otp = hashOtp;
    this._update.expireTime = new Date(Date.now() + 5 * 60 * 1000); // Reset expiry
  }
  next();
});

// Static method to verify OTP
emailOtpSchema.static("verify_otp", async function (email, otp) {
  try {
    const emailOtp = await this.findOne({ email });
    if (!emailOtp) {
      throw new apiError("OTP has expired. Please try again.");
    }
    const verifySalt = emailOtp.salt;
    const hashOtp = createHmac("sha256", verifySalt).update(otp).digest("hex");

    if (hashOtp === emailOtp.otp) {
      return true; // OTP is valid
    }
    return false; // OTP is invalid
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Ensure expiration index
emailOtpSchema.index({ expireTime: 1 }, { expireAfterSeconds: 0 });

// Create model
const EmailOtp = mongoose.model("EmailOtp", emailOtpSchema);

module.exports = EmailOtp;
