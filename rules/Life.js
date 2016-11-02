'use strict';
class Life {
  // Determines what counts as "alive".

  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {
      "min-energy": 0,
      "start-energy": 100
    };

    // merge provided config values with defaults
    Object.keys(this.config).forEach((key) => {
      if (config.hasOwnProperty(key)) {
        this._config[key] = config[key];
      }
    });
  }

  // describe what this rule does with the world or entities
  describe(){
    return {
      "name":"Life",
      "version":"0.0.1",
      "overview":"Decides what counts as 'alive'",
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
    if (entity.hasProperty("spawn")) {
      entity.setProperty("energy", this.config['start-energy']);
      entity.setProperty("alive", true);
      entity.removeProperty("spawn");
      this._entities.push(entity);
    }
  }

  // Called when an entity is removed from the world.
  entityRemoved(entity){
    if (this._entities.indexOf(entity) > -1) {
      this._entities.splice(this._entities.indexOf(entity), 1);
    }
  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    this._world.entities.forEach((entity) => {
      if (entity.getProperty("energy") < this.config['min-energy']) {
        entity.setProperty("dead", true);
        entity.removeProperty("alive");
      }
    });
    return Promise.resolve(undefined);
  }

}

module.exports = Life;
