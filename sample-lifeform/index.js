const socket = require('socket.io-client')('http://localhost:8088');
const EOL = require('os').EOL;
const readline = require('readline');

socket.on('connect', function(){
  console.log("Connected.");
});

socket.on('disconnect', function(){
  console.log("disconnected");
});

socket.on('describe', function(data){
  print(data);
});

socket.on('state', function(data){
  state = data;
});

var state = {};
var printState = function(){
  var lines = [];
  lines.push("******************");
  Object.keys(state).forEach(function(key){
    lines.push(key + ":" + JSON.stringify(state[key]));
  });
  lines.push("******************");
  process.stdout.write(lines.join(EOL) + EOL);
};

var print = function(txt){
  console.log(txt);
};

var commands = {
  "spawn":function(){
    socket.emit("spawn");
  },
  "describe":function(){
    socket.emit("describe");
  },
  "state":function(){
    printState();
  },
  "move":function(command){
    var parts = command.split(" ");
    var packet = {move:{coords:[]}};
    packet.move.coords[0] = parseInt(parts[1], 10);
    packet.move.coords[1] = parseInt(parts[2], 10);
    socket.emit("update", packet);
  },
  "help":function(){
    print(Object.keys(commands).join(EOL));
  }
};

var handleCommand = function(cmd){
  cmd = cmd.replace("\n", "").replace("\r", "");
  var cmdName = cmd.split(" ")[0];
  if (commands.hasOwnProperty(cmdName)) {
    commands[cmdName](cmd);
  }
};

process.stdin.setEncoding('utf8');
process.stdin.on("data", function(chunk){
  handleCommand(chunk);
});
