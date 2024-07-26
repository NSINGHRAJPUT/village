const mongoose = require("mongoose");

let chatUser;

try {
  chatUser = mongoose.model("chatUser");
} catch (error) {
  const chatUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  chatUser = mongoose.model("chatUser", chatUserSchema);
}

module.exports = chatUser;
