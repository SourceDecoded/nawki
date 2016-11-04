'use strict';
// Move.js
// permits entities to move around the environment

class Move {

  constructor(config) {
    config = config || {};
    var self = this;
    this._entities = [];
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
      "reads":"speed.coords[0], speed.coords[1], move.coords[0], move.coords[1]",
      "mutates":"speed.coords[0], speed.coords[1]",
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
    this._entities.forEach((entity) => {
      if (entity.getProperty("alive")){
        var move = entity.getProperty("move");
        if (move && Array.isArray(move.coords)) {
          var speed = entity.getProperty("speed");
          for(var i = 0; i < move.coords.length; i++) {
            speed.coords[i] += move.coords[i];
          }
          move.coords = [];
        }
      }
    });
    return Promise.resolve(undefined);
  }

  entityAdded(entity) {
    if (entity.getProperty("physics")) {
      this._entities.push(entity);
    }
  }

  entityRemoved(entity){
    if (this._entities.indexOf(entity) > -1) {
      this._entities.splice(this._entities.indexOf(entity), 1);
    }
  }

  entityInactive(entity){

  }

}

module.exports = Move;
