var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

function logger(req, res, next) {
  console.log("incoming request at " + new Date());
  next();
};

app.get('/', logger, function (req, res) {
  res.send('Hello World!');
});

app.post('/stock', function (req, res) {
  res.json({ isbn: req.body.isbn, count: req.body.count });
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