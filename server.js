const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/userRoute");
const connectDB = require("./config/db");
const UserOTPVerification = require("./Models/UserOTPVerification");

const cors = require("cors");
const ImageS = require("./Models/Image");

app.use(express.json());
dotenv.config();
connectDB();
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.post("/save-img", async (req, res) => {
  const { image } = req.body;

  const img = await ImageS.create({
    image,
  });

  res.send(img);
});

app.use("/api", userRoute);

app.listen(5000, () => {
  console.log("Server up and running");
});
