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
            id: item._id,
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

const getSoEntries = (cb) => {
  entry.soEntry
    .find({})
    .sort({ date: -1 })
    .exec((err, result) => {
      if (err) {
        cb(err);
      } else {
        const results = [];
        result.forEach((obj) => {
          if (!obj.item) {
            return;
          }
          const formatted = {
            id: obj._id,
            link: obj.item.link,
            title: obj.item.title,
            tags: obj.item.tags,
          };
          results.push(formatted);
        });
        cb(null, results);
      }
    });
};

const deleteEntry = (id, cb) => {
  entry.journalEntry.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const deleteSoEntry = (id, cb) => {
  entry.soEntry.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const updateEntry = (id, obj, cb) => {
  entry.journalEntry.updateOne({ _id: id }, obj, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
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
  getSoEntries,
  deleteEntry,
  deleteSoEntry,
  updateEntry,
};
