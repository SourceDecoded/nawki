'use strict';

var randomInRange = function(min, max){
  return Math.random() * (max-min) + min;
};

class SpawnEnergy {
  // This rule doesn't do anything but serve as a template for new rules.

  constructor(config){
    this._world = null;
    this._entities = [];
    // default config values
    this.config = {
      "spawn-rate": 0.01,
      "min-value": 0.5,
      "max-value": 2,
      "area": [[-200, 200], [-200, 200]]
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
      "name":"SpawnEnergy",
      "version":"0.0.1",
      "overview":"Spawns energy in the world",
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
    if (this._entities.indexOf(entity) > -1) {
      this._entities.splice(this._entities.indexOf(entity), 1);
    }
  }

  // This entity has gone braindead. Its brain disconnected or is otherwise
  // now just an inactive entity
  entityInactive(entity){

  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    if (Math.random() <= this.config['spawn-rate']) {
      var energyValue = randomInRange(this.config['min-value'], this.config['max-value']);
      var e = new this._world.entityConstructors.Entity();
      e.setProperty('edible', true);
      e.setProperty('nutrients', {energy:energyValue, public: true});
      e.setProperty('meta', {public: true, type:'nutrient'});
      var posX = randomInRange(this.config.area[0][0], this.config.area[0][1]);
      var posY = randomInRange(this.config.area[1][0], this.config.area[1][1]);
      e.setProperty('position', {coords:[posX, posY], public: true});
      this._world.addEntity(e);
    }
    return Promise.resolve(undefined);
  }

}

module.exports = SpawnEnergy;
