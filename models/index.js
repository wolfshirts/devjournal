const mongoose = require("mongoose");
const entry = require("./entry");
const axios = require("axios");

const mongoURI = "mongodb://localhost:27017/devjournal";

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postNewEntry = (post, cb) => {
  // Post to the db
  // const firstPost = new entry({
  //   date: Date.now(),
  //   challenge: "posting to mongo",
  //   action: "reading the docs",
  //   result: "got it posted.",
  //   tags: "mongo mongodb mongoose",
  // });
  const newPost = new entry.journalEntry({
    date: Date.now(),
    ...post,
  });

  newPost.save((err) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, newPost);
    }
  });
};

const postNewSoEntry = (post, cb) => {
  const newPost = new entry.soEntry(post);
  newPost.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getEntries = (cb) => {
  entry.journalEntry
    .find({})
    .sort({ date: -1 })
    .exec((err, res) => {
      if (err) {
        cb(err, null);
      } else {
        const resObject = {
          results: [],
        };
        res.forEach((item) => {
          const parsedObject = {
            date: item.date,
            challenge: item.challenge,
            action: item.action,
            result: item.result,
            tags: item.tags,
          };
          resObject.results.push(parsedObject);
        });
        cb(null, resObject);
      }
    });
};

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`Mongo broke at: ${mongoURI}`);
  console.log(err);
});

module.exports = {
  postNewEntry,
  getEntries,
  postNewSoEntry,
};
