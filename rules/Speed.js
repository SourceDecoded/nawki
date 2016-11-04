'use strict';
class Speed {

  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {
      "dimensions": 2,
      "limits": [[-Infinity, Infinity],[-Infinity, Infinity]]
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
      "name":"Speed",
      "version":"0.0.1",
      "overview":"Gives entities speed",
      "reads":"speed.coords[n], position.coords[n]",
      "mutates":"speed.coords[n], position.coords[n]",
      "adds":"speed.coords[n]",
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
      var coords = [];
      for(var i = 0; i < this.config.dimensions; i++) {
        coords[i] = 0;
      }
      entity.setProperty("speed", {coords:coords, public:true});
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

  entityInactive(entity){
    
  }

  updateAsync(){
    this._entities.forEach((entity) => {
      var limits = this.config.limits;
      var speed = entity.getProperty("speed");
      var position = entity.getProperty("position");
      for (var i = 0; i < this.config.dimensions; i++) {
        // enforce speed limits
        if (speed.coords[i] < limits[i][0]) {
          speed.coords[i] = limits[i][0];
        }
        if (speed.coords[i] > limits[i][1]) {
          speed.coords[i] = limits[i][1];
        }

        // update position
        position.coords[i] += speed.coords[i];
      }

    });
    return Promise.resolve(undefined);
  }

}

module.exports = Speed;
