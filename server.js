var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var favicon = require('serve-favicon');
var fs = require('fs');

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));

// Setup the Parse goodness.
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/thehoick',
  cloud: '/Users/adam/work/thehoick-notes/thehoick-notes-server/cloud/main.js',
  appId: 'com.thehoick.parse',
  masterKey: 'pareykey',
  clientKey: 'clientHoickKey',
  fileKey: 'fileHoickKey',
  javascriptKey: 'jsHoickKey'
});

// Parse API path.
app.use('/parse', api);


app.get('/', function(req, res) {
  res.status(200).send('Express is running here.');
});


// Fire up the server.
var port = process.env.PORT || 7070;
app.listen(port, '0.0.0.0', function() {
  console.log('thehoick-notes-server running on port ' + port + '.');
});
