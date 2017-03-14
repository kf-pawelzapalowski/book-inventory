var express = require('express');
var bodyParser = require('body-parser');
var route = require('./route');
var errorHandlers = require('./errorHandlers');

module.exports = function (stockRepository) {
  var app = express();
  app.use(bodyParser.json());

  route(app, stockRepository);
  errorHandlers(app); 

  return app;
};