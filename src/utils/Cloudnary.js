// const cloudinary = require("cloudinary").v2;

// lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    return null;
  }
};

exports.deleteFromCloudinary = async (cloudinaryPath) => {
  try {
    if (!cloudinaryPath) return null;
    const response = await cloudinary.uploader.destroy(cloudinaryPath);
    console.log("cloudinary Delete File response : ", response);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to delete file ");
  }
};
