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
//     const existingUser = await User.findOne({ email: "neeraj.singh@example.com" });
//     if (!existingUser) {
//       const hashedPassword = await bcrypt.hash("Neeraj@2610", 10); 
//       await User.create({
//         name: "Neeraj Singh Rajput",
//         email: "nsinghrajputx@gmail.com",
//         password: hashedPassword,
//       });
//       console.log("Default user 'Neeraj Singh Rajput' added.");
//     }
//   } catch (error) {
//     console.error("Error adding default user:", error);
//   }
// }

// Call the function on server start
// addDefaultUser();

module.exports = User;
