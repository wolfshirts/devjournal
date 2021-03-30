const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  // your code here
});

const journalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = journalEntry;
