const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  challenge: String,
  action: String,
  result: String,
});

const journalEntrySchema = new mongoose.Schema({
  // your code here
  date: Date,
  car: [carSchema],
});

const journalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = journalEntry;
