var express = require('express');
var ParseServer = require('parse-server').ParseServer;
// var parse = require('parse').Parse;
var favicon = require('serve-favicon');
var fs = require('fs');
var http = require('http')
// var passport = require('passport');
// var ParseStrategy = require('passport-parse');
var session = require('express-session')

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));

// Setup Socket.io server from the Express app.
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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

// parse.initialize('com.thehoick.parse', 'jsHoickKey');
// var parseStrategy = new ParseStrategy({parseClient: parse});
// passport.use(parseStrategy);


app.use(session({
  secret: 'thehoick',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Serve the web app.
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  var sess = req.session;

  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
    res.end();
  });
});

// Open web socket.
io.on('connection', function(socket){
  // console.log('a user connected:', socket.request.headers['user-agent']);

  socket.on('text-entered', function(obj){
    console.log('txt: ' + obj.txt, 'name:', obj.name);
    io.emit('text-entered', obj);
  });
});

// app.get('/authenticate', function(req, res) {
//   passport.authenticate('parse', function(err, user, info) {
//       if (err) {
//           return res.status(400).json({payload : {error: info}, message : info.message});
//       }
//
//       if (!user) {
//           return res.status(400).json({payload : {error: info}, message : info.message});
//       }
//
//     req.logIn(user, function(err) {
//       if (err) {
//           return res.status(400).json({payload : {error: err}, message : info.message});
//       }
//
//       return res.json({
//           payload : req.user,
//           message : "Authentication successfull"
//       });
//     });
//   })(req,res);
// });


// Default route using middleware... I think.
app.use(function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
    res.end();
  });
});

// Fire up the server.
var port = process.env.PORT || 7070;
server.listen(port, '0.0.0.0', function() {
  console.log('thehoick-notes-server running on port ' + port + '.');
});
