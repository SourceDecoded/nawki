'use strict';
class FiniteWorld {
  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {
      "size": [
        {"min":-10000, "max":10000},
        {"min":-10000, "max":10000}
      ]
    };

    // merge provided config values with defaults
    Object.keys(this.config).forEach((key) => {
      if (config.hasOwnProperty(key)) {
        this.config[key] = config[key];
      }
    });
  }

  // describe what this rule does with the world or entities
  describe(){
    return {
      "name":"FiniteWorld",
      "version":"0.0.1",
      "overview":"A 2d world of limited size. Assigns a random position to each new entity. Enforces positions in bounds.",
      "reads":"position.coords[0], position.coords[1]",
      "mutates":"position.coords[0], position.coords[1]",
      "adds":"",
      "config":this.config
    };
  }

  // Called when the rule is added to the world.
  activateAsync(world){
    this._world = world;
    return Promise.resolve(undefined);
  }

  // Called when the rule has been removed from the world. Use to clean up
  //   any resources used by the rule.
  deactivate(){

  }

  // Called when a new entity is added to the world.
  entityAdded(entity){
    var position = entity.getProperty("position");
    var sizes = this.config.size;

    position.coords[0] = Math.floor(Math.random() * (sizes[0].max - sizes[0].min + 1)) + sizes[0].min;
    position.coords[1] = Math.floor(Math.random() * (sizes[1].max - sizes[1].min + 1)) + sizes[1].min;
    position.transmit = true;
  }

  // Called when an entity is removed from the world.
  // entity.remove() has been called by this point
  entityRemoved(entity){

  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    return Promise.resolve(undefined);
  }
}

module.exports = FiniteWorld;
