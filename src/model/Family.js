
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FamilySchema = new Schema({
  familyName: { type: String, required: true },  // Family surname or identifier
  caste: { type: Schema.Types.ObjectId, ref: "Caste", required: true },  // Reference to the caste this family belongs to
  mainPerson: { type: Schema.Types.ObjectId, ref: "FamilyMember" },  // Reference to the main member of the family
  members: [{ type: Schema.Types.ObjectId, ref: "FamilyMember" }],  // List of family members
});

module.exports = mongoose.models.Family || mongoose.model("Family", FamilySchema);
