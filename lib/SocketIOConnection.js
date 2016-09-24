'use strict';
var Observer = require('./Observer');
var Client = require('./Client');

class SocketIOConnection {
  constructor(io) {
    if (!io) {
      throw new Error("Need a Socket.IO instance to work");
    }
    this._io = io;
    this._observer = null;
  }

  // start listening to this connection
  observe(){
    var observer = new Observer();
    var io = self._io;
    io.on('connection', (socket) => {
      var client = new Client();

      // the new client wants to be an organism
      socket.on('register-organism', (e) => {
        client.notify({type:'register-organism', data:e});
      });

      // the new client wants to be an observer (watcher)
      socket.on('register-observer', (e) => {
        client.notify({type:'register-observer', data:e})
      });

      // the new client just wants to know about our rules setup
      socket.on('describe', (e) => {
        client.notify({type:'describe', data:e});
      });

      // the connected organism wants to be alive
      socket.on('spawn', (e) => {
        client.notify({type:'spawn', data:e});
      });

      // the connected organism is sending a new state packet
      socket.on('update', (e) => {
        client.notify({type:'update', data:e});
      });

      // the connected organism has given up on life
      socket.on('die', (e) =>{
        client.notify({type:'die', data:e});
      });

      // implement this method for sending state back to the client
      client.sendState = function(message){
        socket.emit('state', message);
      }

      observer.notify({'type':'connection', 'client':client})
    });

    io.on('disconnect', () => {
      // do we need to do anything here?
    });

    return observer;
  }

  // send some message to every client on this connection
  broadcast(message) {
    this._io.emit('broadcast', message);
  }

  // clean up, we're gettin' outta here!
  dispose() {
    this._observer.dispose();
  }
}

module.exports = SocketIOConnection;
