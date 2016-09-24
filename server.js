// Start us a fresh new Nawki server
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nawki = new require('./lib/Nawki')();
var socketIOConnection = new require('./lib/SocketIOConnection')(io);
var rules = require('./rules.json');

// Nawki stuff
nawki.addRulesLocation(path.resolve('rules'));
nawki.loadRules(rules);
nawki.addNetworkConnection(socketIOConnection);

// web stuff
app.static('web');

var port = process.env.PORT || 8080;
http.listen(port, function(){
  console.log("nawki is awake on " + port);
});
