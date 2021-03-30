const mongoose = require("mongoose");
const attend = require("./entry");

const mongoURI = "mongodb://localhost:27017/devjournal";

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`Mongo broke at: ${mongoURI}`);
  console.log(err);
});
