const mongoose = require("mongoose");
const {createHmac,randomBytes} = require('node:crypto');


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

emailOtpSchema.pre('save',async function(next){
    this.expireTime = new Date(Date.now() + 5 * 60 * 100)
    const emailOtp=this;
    const salt = randomBytes(16).toString('hex');
    const hashOtp=createHmac("sha256",salt).update(emailOtp.otp).digest("hex");
    this.salt=salt;
    this.otp=hashOtp;
    next()
})

emailOtpSchema.index({ expireTime: 1 }, { expireAfterSeconds: 0 });



const EmailOtp = mongoose.model("EmailOtp", emailOtpSchema);

module.exports = EmailOtp;
