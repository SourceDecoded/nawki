// Start us a new nawki server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nawki = require('./lib/Nawki')(io);

app.static('web');

var port = process.env.PORT || 8080;
http.listen(port, function(){
  console.log("nawki is awake on " + port);
});
