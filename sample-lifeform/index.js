const socket = require('socket.io-client')('http://localhost:8088');
const EOL = require('os').EOL;

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
  print(data);
});

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
  "help":function(){
    print(Object.keys(commands).join(EOL));
  }
};

var handleCommand = function(cmd){
  cmd = cmd.replace("\n", "").replace("\r", "");
  var cmdName = cmd.split(" ")[0];
  commands[cmdName](cmd);
};

process.stdin.setEncoding('utf8');
process.stdin.on("data", function(chunk){
  handleCommand(chunk);
});
