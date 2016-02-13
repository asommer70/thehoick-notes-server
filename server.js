var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var favicon = require('serve-favicon');
var fs = require('fs');

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
var expressWs = require('express-ws')(app);

// GET /assets (static files).
app.use('/assets', express.static(__dirname + '/public'));

// Setup the Parse goodness.
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/thehoick',
  cloud: '/Users/adam/work/thehoick-notes/thehoick-notes-server/cloud/main.js',
  appId: 'com.thehoick.parse',
  masterKey: 'parseykey',
  clientKey: 'clientHoickKey',
  fileKey: 'fileHoickKey',
  javascriptKey: 'jsHoickKey'
});

// Parse API path.
app.use('/parse', api);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});


app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
    res.end();
  });
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

// Fire up the server.
var port = process.env.PORT || 7070;
app.listen(port, '0.0.0.0', function() {
  console.log('thehoick-notes-server running on port ' + port + '.');
});
