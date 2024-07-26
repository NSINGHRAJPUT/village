// models/familyMember.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FamilyMemberSchema = new Schema({
  relation: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  caste: { type: String, required: true },
  photo: { type: String, required: true },
});

module.exports =
  mongoose.models.FamilyMember ||
  mongoose.model("FamilyMember", FamilyMemberSchema);
