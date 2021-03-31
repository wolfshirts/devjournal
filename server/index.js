const express = require("express");
const db = require("../models/index.js");
const http = require("https");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/addentry", (req, res) => {
  // Dump to db with req.body
  // Send back 200 ok or error.
  let body = req.body;
  db.postNewEntry(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      // const unixEpochNow = Date.now() / 1000;
      // const pastEpoch = unixEpochNow - 31536000;
      const search = result.challenge;
      const tagged = result.tags;
      axios
        .get(
          `https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=5&order=desc&sort=relevance&q=${search}&accepted=True&site=stackoverflow&answers=5`
        )
        .then((data) => {
          data.data.items.forEach((item) => {
            db.postNewSoEntry({ item: item });
          });
          res.send(data.data);
        })
        .catch((e) => {
          res.send(e);
        });
    }
  });
});

app.delete("/deleteentry/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Need the id of the entry to delete.");
  } else {
    db.deleteEntry(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

app.delete("/deletesoentry/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("need id of entry to delete");
  } else {
    db.deleteSoEntry(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
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

app.get("/getso", (req, res) => {
  db.getSoEntries((err, result) => {
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
