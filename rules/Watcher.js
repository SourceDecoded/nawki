'use strict';
class Watcher {

  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {};

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
      "name":"Watcher",
      "version":"0.0.1",
      "overview":"Send world state to registered watchers",
      "reads":"",
      "mutates":"",
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

  }

  // Called when an entity is removed from the world.
  // entity.remove() has been called by this point
  entityRemoved(entity){

  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    var toTransmit = this._world.entities.filter((entity) => {
      return entity.hasProperty("transmit");
    }).map((entity) => {
      return entity.getProperty("transmit");
    });

    return this._world.entities.filter((entity) => {
      return entity.hasProperty("watch");
    }).reduce((promise, entity) => {
      promise.then(() => {
        entity.transmitStateAsync({entities:toTransmit});
      });
    }, Promise.resolve(undefined));

  }

}

module.exports = Watcher;
