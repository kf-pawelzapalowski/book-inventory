var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var stockRepository = require('./stockRepository');

app.use(bodyParser.json());

function logger(req, res, next) {
  console.log("incoming request at " + new Date());
  next();
};

var errorHandler = function (err, req, res, next) {
  console.error(err);
  err.status = err.status || 500;
  res.status(err.status).send('Error: ' + err.status);
  next();
};

app.get('/stock', function (req, res, next) {
  stockRepository
    .findAll()
    .then(function (books) {
      res.json(books);
    })
    .catch(next);
});

app.get('/stock/:id', logger, function (req, res, next) {
  stockRepository
    .findOne(req.params.id)
    .then(function (book) {
      res.json(book);
    })
    .catch(next);
});

app.post('/stock', function (req, res, next) {
  stockRepository
    .stockUp(req.body)
    .then(function () {
      res.json({ isbn: req.body.isbn, count: req.body.count });
    })
    .catch(next);
});

app.use(function (req, res, next) {
  var err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;