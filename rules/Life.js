'use strict';
class Life {
  // Determines what counts as "alive".

  constructor(config){
    this._world = null;
    this._entities = null;
    // default config values
    this._config = {};

    // merge provided config values with defaults
    Object.keys.forEach(function(key){
      if (config.hasOwnProperty(key)) {
        this._config[key] = config[key];
      }
    });
  }

  // describe what this rule does with the world or entities
  describe(){
    return {};
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

  }

  // Called when an entity is removed from the world.
  entityRemoved(entity){

  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    return Promise.resolve(undefined);
  }

}
