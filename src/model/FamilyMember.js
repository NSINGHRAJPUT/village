// models/familyMember.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FamilyMemberSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true }, 
  mobile: { type: String, required: true, unique: true }, 
  photo: { type: String },
  relationToMainPerson: { type: String}, 
  maternalSurname : { type: String },
  isMarried : { type: Boolean, default: false },
  education : { type: String },
  occupationAddress : { type: String },
  residentAddress : { type: String },
  bloodGroup : { type: String },
  isMainPerson: { type: Boolean, default: false },
  caste: { type: Schema.Types.ObjectId, ref: "Caste", required: true },
  familyId: { type: Schema.Types.ObjectId, ref: "Family", required: true }, 
});


module.exports =
  mongoose.models.FamilyMember ||
  mongoose.model("FamilyMember", FamilyMemberSchema);
