const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let User;

try {
  User = mongoose.model("User");
} catch (error) {
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  User = mongoose.model("User", UserSchema);
}

// async function addDefaultUser() {
//   try {
//     const existingUser = await User.findOne({ email: "kamalpurahmedabad@gmail.com" });
//     if (!existingUser) {
//       const hashedPassword = await bcrypt.hash("Kamalpur@2024", 10); 
//       await User.create({
//         name: "Kamalpur Ahmedabad",
//         email: "kamalpurahmedabad@gmail.com",
//         password: hashedPassword,
//       });
//       console.log("Default user 'Admin' added.");
//     }
//   } catch (error) {
//     console.error("Error adding default user:", error);
//   }
// }

// addDefaultUser();
// Call the function on server start

module.exports = User;
