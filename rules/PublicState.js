'use strict';
class PublicState {
  // This rule doesn't do anything but serve as a template for new rules.

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
      "name":"PublicState",
      "version":"0.0.1",
      "overview":"Collect public state properties for convenience of other rules",
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

  updateAsync(){
    this._world.entities.forEach((entity) => {
      var publicState = {};
      Object.keys(entity.properties).forEach(function(key){
        if (entity.properties[key].public) {
          var stateInfo = {};
          Object.keys(entity.properties[key]).forEach((propKey) => {
            // The "public" key is a given, no need to send it down the wire
            if (propKey !== "public") {
              stateInfo[propKey] = entity.properties[key][propKey];
            }
          });
          publicState[key] = stateInfo;
        }
      });
      if (Object.keys(publicState).length === 0) {
        entity.removeProperty("public");
      } else {
        entity.setProperty("public", publicState);
      }
    });

    return Promise.resolve(undefined);
  }

}

module.exports = PublicState;
