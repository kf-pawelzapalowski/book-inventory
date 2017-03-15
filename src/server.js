var stockRepository = require('./stockRepository')();
var auth = require('./auth')('user', 'password');
var app = require('./app')(stockRepository, auth);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});