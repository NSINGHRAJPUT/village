// models/caste.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CasteSchema = new Schema({
  name: { type: String, required: true, unique: true },
  families: [{ type: Schema.Types.ObjectId, ref: "Family" }],  
});

const Caste = mongoose.models.Caste || mongoose.model("Caste", CasteSchema);


async function addDefaultCaste() {
  try {
    const existingCaste = await Caste.findOne({ name: "Rajput" });
    if (!existingCaste) {
      await Caste.create({ name: "Rajput" });
      console.log("Default caste 'Rajput' added.");
    }
  } catch (error) {
    console.error("Error adding default caste:", error);
  }
}

// Call the function on server start
addDefaultCaste();

module.exports = Caste;
