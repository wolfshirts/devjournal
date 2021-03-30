const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  date: Date,
  challenge: String,
  action: String,
  result: String,
  tags: String,
});

const journalEntry = mongoose.model("CarModel", carSchema);

module.exports = journalEntry;
