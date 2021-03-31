const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  date: Date,
  challenge: String,
  action: String,
  result: String,
  tags: String,
});

const documentDumpSchema = new mongoose.Schema({
  item: {},
});

const journalEntry = mongoose.model("CarModel", carSchema);
const soEntry = mongoose.model("SoModel", documentDumpSchema);

module.exports = {
  journalEntry,
  soEntry,
};
