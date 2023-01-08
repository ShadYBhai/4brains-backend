const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB CONNECTED at: ${conn.connection.host}`);
  } catch (error) {
    res.status(400).json(error);
    process.exit(1);
  }
};

module.exports = connectDB;
