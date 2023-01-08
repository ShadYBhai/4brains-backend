const asyncHandler = require("express-async-handler");
const User_Model = require("../Models/User_Model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const UserOTPVerification = require("../Models/UserOTPVerification");

let transporter = nodemailer.createTransport({
  host: "ashishnick.private@gmail.com",
  auth: {
    user: "ashishnick.private@gmail.com",
    pass: process.env.AUTH_PASS,
  },
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User_Model.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User_Model.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User_Model.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("INVALID USER DATA");
  }
  sendOTPVerificationEmail(user.email, res);
});

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "verify your email",
      html: `<p>this code expires in 1 hour </p>`,
    };

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();

    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  authUser,
  createUser,
};
