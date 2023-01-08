const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOTPVerification = mongoose.model(
  "UserOTPVerificationSchema",
  UserOTPVerificationSchema
);

module.exports = UserOTPVerification;
