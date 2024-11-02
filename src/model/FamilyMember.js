// models/familyMember.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FamilyMemberSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },  // Date of birth for age calculation and login validation
  mobile: { type: String, required: true, unique: true },  // Unique mobile number for login
  caste: { type: Schema.Types.ObjectId, ref: "Caste", required: true },  // Reference to the caste
  photo: { type: String },
  relationToMainPerson: { type: String},  // Relationship with the main member
  isMainPerson: { type: Boolean, default: false },
  familyId: { type: Schema.Types.ObjectId, ref: "Family", required: true },  // Reference to the family
});

// Automatically calculate age from DOB
FamilyMemberSchema.virtual("age").get(function () {
  const diffMs = Date.now() - this.dob.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

module.exports =
  mongoose.models.FamilyMember ||
  mongoose.model("FamilyMember", FamilyMemberSchema);
