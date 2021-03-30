const express = require("express");
const db = require("../models/index.js");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/addentry", (req, res) => {
  // Dump to db with req.body
  // Send back 200 ok or error.
  db.postNewEntry(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/getentries", (req, res) => {
  db.getEntries((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log("express is on port " + port);
});
