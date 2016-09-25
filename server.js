// Start us a fresh new Nawki server
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nawki = new (require('./lib/Nawki'))();
var socketIOConnection = new (require('./lib/SocketIOConnection'))(io);
var rules = require('./rules.json');

// Nawki stuff
nawki.addRulesLocation(path.resolve('rules'));
nawki.loadRules(rules);
nawki.addNetworkConnection(socketIOConnection);

// web stuff
app.use(express.static('web'));

var port = process.env.PORT || 8080;
http.listen(port, function(){
  console.log("nawki is awake on " + port);
});
