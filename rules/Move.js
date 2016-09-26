'use strict';
// Move.js
// permits entities to move around the environment

class Move {

  constructor(config) {
    config = config || {};
    var self = this;

    this.config = {
      "allow-overreach": true,
      "momentum": true,
      "friction": 2
    };

    Object.keys(this.config).forEach((key) => {
      if (config.hasOwnProperty(key)) {
        this.config[key] = config[key];
      }
    });

  }

  describe() {
    return {
      "name":"Move",
      "version":"0.0.1",
      "overview":"Allows entities to move around in the world by applying force.",
      "reads":"pos[0], pos[1], move[0], move[1], energy",
      "mutates":"pos[0], pos[1], energy",
      "config":this.config
    };
  }

  activateAsync(world) {
    this._world = world;
    return Promise.resolve(undefined);
  }

  deactivate() {

  }

  updateAsync() {
    return Promise.resolve(undefined);
  }

  entityAdded(entity) {

  }

  entityRemoved(entity) {

  }

}

module.exports = Move;
