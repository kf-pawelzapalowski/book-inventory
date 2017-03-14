var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var errorHandlers = require('./errorHandlers');

module.exports = function (stockRepository) {
  var stockController = require('./stockController')(stockRepository);

  var app = express();
  app.use(bodyParser.json());

  routes(app, stockController);
  errorHandlers(app); 

  return app;
};