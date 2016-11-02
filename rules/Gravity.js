'use strict';
class Gravity {

  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {
      "dimension": 0,
      "factor": 0.1
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
      "name":"Gravity",
      "version":"0.0.1",
      "overview":"Simple single-dimension acceleration",
      "reads":"speed.coords[x]",
      "mutates":"speed.coords[x]",
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
    if (entity.getProperty("physics")) {
      entity.setProperty("gravity", {factor:this.config.factor});
      this._entities.push(entity);
    }
  }

  // Called when an entity is removed from the world.
  // entity.remove() has been called by this point
  entityRemoved(entity){
    if (this._entities.indexOf(entity) > -1) {
      this._entities.splice(this._entities.indexOf(entity), 1);
    }
  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    this._entities.forEach((entity) => {
      var speed = entity.getProperty("speed");
      var factor = entity.getProperty("gravity").factor;
      speed.coords[this.config.dimension] += factor;
    });
    return Promise.resolve(undefined);
  }

}

module.exports = Gravity;
