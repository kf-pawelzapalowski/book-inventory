var express = require('express')
var app = express()

function logger(req, res, next) {
  console.log("incoming request at " + new Date());
  next();
};

app.get('/', logger, function (req, res) {
  throw new Error("a");
  res.send('Hello World!');
});

app.use(function(req, res, next){
  var err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  err.status = err.status || 500;
  res.status(err.status).send('Error: ' + err.status);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});