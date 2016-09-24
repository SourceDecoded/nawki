var Observable = require('./Observer');

class Client extends Observer {
  constructor(){
  }

  // message from server to client
  send(message) {
    throw new Error("Client send needs to be overridden");
  }

}

module.exports = Client;
