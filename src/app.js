var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var errorHandlers = require('./errorHandlers');

module.exports = function (stockRepository, auth) {
  var stockController = require('./stockController')(stockRepository);

  var app = express();
    
  app.use(auth);
  app.use(bodyParser.json());

  routes(app, stockController);
  errorHandlers(app); 

  return app;
};