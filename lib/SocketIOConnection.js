'use strict';
var Entity = require('./Entity');

var nullWorld = {
  "describe":function(){},
  "spawn":function(){},
  "update":function(){},
  "die":function(){}
};

class SocketIOConnection {
  constructor(io) {
    if (!io) {
      throw new Error("Need a Socket.IO instance to work");
    }
    this._io = io;
    this.world = nullWorld;
    this.init();
    this.sockets = [];
  }

  init() {
    var io = this._io;
    var world = this.world;
    io.on('connection', (socket) => {
      new SocketHandler(socket, world);
    });

    io.on('disconnect', () => {
      // do we need to do anything here?
    });
  }

  // send some message to every client on this connection
  broadcast(message) {
    this._io.emit('broadcast', message);
  }

  // clean up, we're gettin' outta here!
  dispose() {

  }
}

class SocketHandler {
  constructor(socket, world){
    this.socket = socket;
    this.world = world;
    this.entity = new Entity();

    this.entity.setState = function(state){
      socket.emit("state", state);
    };

    // the new client just wants to know about our rules setup
    socket.on('describe', (e) => {
      socket.emit("describe", world.describe());
    });

    socket.on('spawn', (e) => {
      
      this.world.addEntity(this.entity);
    });

    // the connected organism is sending a new state packet
    socket.on('update', (e) => {

    });

    // the connected organism has given up on life
    socket.on('die', (e) =>{

    });
  }

}

module.exports = SocketIOConnection;
