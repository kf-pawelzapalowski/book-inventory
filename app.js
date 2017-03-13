var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017/book-inventory';

app.use(bodyParser.json());

function logger(req, res, next) {
  console.log("incoming request at " + new Date());
  next();
};



app.get('/stock', function (req, res) {
  MongoClient.connect(dbUrl, function (err, db) {
    db.collection('books').find({}).toArray(function (err, books) {
      res.json(books);
      db.close();
    });
  });
});

app.get('/stock/:id', logger, function (req, res) {
  MongoClient.connect(dbUrl, function (err, db) {
    db.collection('books').findOne({ isbn: req.params.id }, function (err, book) {
      res.json(book);
      db.close();
    });
  });

});
app.post('/stock', function (req, res) {
  var bookEntry = { isbn: req.body.isbn, count: req.body.count };
  MongoClient.connect(dbUrl, function (err, db) {
    db.collection('books').updateOne({ isbn: bookEntry.isbn }, bookEntry, { upsert: true });
    db.close();
    res.json({ isbn: req.body.isbn, count: req.body.count });
  });
});

app.use(function (req, res, next) {
  var err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  err.status = err.status || 500;
  res.status(err.status).send('Error: ' + err.status);
})

module.exports = app;