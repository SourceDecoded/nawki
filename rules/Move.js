'use strict';
// Move.js
// permits entities to move around the environment

class Move {

  constructor(config) {
    config = config || {};
    var self = this;

    this.config = {};

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
      "reads":"position.coords[0], position.coords[1], health.energy, request.move.coords[0], request.move.coords[1]",
      "mutates":"position.coords[0], position.coords[1], health.energy",
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
    this._world.entities.forEach(function(entity){
      entity.getProperties("request").filter((req) => {
        return req.move && req.move.coords && (typeof req.move.coords.length === "number");
      }).forEach((req) => {
        var position = entity.getProperty("position");
        if (position) {
          var newPos = [];
          for (var i = 0; i < position.coords.length; i++) {
            position.coords[i] += req.move.coords[i];
          }
        }
      });

    });
    return Promise.resolve(undefined);
  }

  entityAdded(entity) {

  }

  entityRemoved(entity) {

  }

}

module.exports = Move;
