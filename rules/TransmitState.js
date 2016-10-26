'use strict';
class TransmitState {

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
      "name":"TransmitState",
      "version":"0.0.1",
      "overview":"Communicate state back to ActiveEntities",
      "reads":"Any property with transmit=true",
      "mutates":"none",
      "adds":"none",
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
    var activeEntities = this._world.entities.filter(function(e){
      return typeof e.transmitStateAsync === "function";
    });

    return activeEntities.reduce((promise, entity) => {
      var transmissableState = {};
      // filter the
      Object.keys(entity.properties).forEach(function(key){
        if (entity.properties[key].length > 1) {
          var transmissableSubProperties = entity.properties[key].filter(function(property){
            return property.transmit === true; // no truthy tricks!
          });
          if (transmissableSubProperties.length > 0) {
            transmissableState[key] = transmissableSubProperties;
          }
        } else {
          if (entity.properties[key][0] && entity.properties[key][0].transmit === true) {
            transmissableState[key] = entity.properties[key][0];
          }
        }
      });
      return promise.then(() => {
        entity.transmitStateAsync(transmissableState);
      });
    }, Promise.resolve(undefined));
  }

}

module.exports = TransmitState;
