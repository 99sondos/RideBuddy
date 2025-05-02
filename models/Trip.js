const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Trip", tripSchema);
