'use strict';
var Entity = require('./Entity');

class ActiveEntity extends Entity {
  constructor(responseChannel) {
    super("active");
    this.responseChannel = responseChannel;
  }

  transmitStateAsync(newState) {
    return this.responseChannel.sendAsync("state", newState);
  }

}

module.exports = ActiveEntity;
