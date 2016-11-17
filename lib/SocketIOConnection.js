'use strict';
var ActiveEntity = require('./ActiveEntity');

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
    this._world = nullWorld;
    this.init();
    this.sockets = [];
  }

  get world() {
    return this._world;
  }

  set world(value) {
    this._world = value;
  }

  init() {
    var io = this._io;
    var world = this.world;
    io.on('connection', (socket) => {
      new SocketHandler(socket, this);
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
  constructor(socket, connection){
    this.socket = socket;
    this.entity = new ActiveEntity(this);
    this.connection = connection;
    this.spawned = false;
    this.watching = false;

    // the new client just wants to know about our rules setup
    socket.on('describe', (e) => {
      socket.emit("describe", this.connection.world.describe());
    });

    socket.on('spawn', (e) => {
      if (!this.spawned && !this.watching) {
        this.entity.setProperty("spawn", true);
        // physical rules should apply to this entity
        this.entity.setProperty("physics", true);
        // this entity wants to make decisions based on its state
        this.entity.setProperty("sentient", true);
        this.entity.setProperty("meta", {public:true, id:this.entity.id, type:'lifeform'});
        this.connection.world.addEntity(this.entity);
        this.spawned = true;
        socket.on('disconnect', () => {
          this.connection.world.entityInactive(this.entity);
        });
      }
    });

    socket.on('watch', (e) => {
      if(!this.spawned && !this.watching) {
        this.entity.setProperty("watch", true);
        this.connection.world.addEntity(this.entity);
        this.watching = true;
        socket.on('disconnect', () => {
          this.connection.world.removeEntity(this.entity);
        });
      }
    });

    // the connected organism is sending a new state packet
    socket.on('update', (e) => {
      Object.keys(e).forEach((key) => {
        this.entity.setProperty(key, e[key]);
      });
    });

    // the connected organism has given up on life
    socket.on('die', (e) =>{

    });
  }

  sendAsync(type, state) {
    this.socket.emit(type, state);
    return Promise.resolve(undefined);
  }

}

module.exports = SocketIOConnection;
