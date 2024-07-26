const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  dotenv.config();
  try {
    const uri = process.env.MOONGOOSE_URI;
    await mongoose.connect(uri);
    console.log("mongoose connected successfully");
  } catch (error) {
    console.log("mongoose connection failed");
    // process.exit(1);
  }
};

module.exports = connectDB;
