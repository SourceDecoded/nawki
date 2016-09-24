class GatherStates {
  // A special rule which collects and state updates from organisims and attaches
  // them to the world

  constructor(config){
    this._world = null;
    this._entities = new Map();
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
    return {
      "name":"GatherStates",
      "overview":"Special rule that collects state updates from entities between world ticks.",
      "version":"0.0.1"
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
    this._entities.set(entity, {});
    entity.filter((e) => {
      return e.type === "update";
    }).onEach(function(e){
      this._entity.set(entity, e.data);
    });
  }

  // Called when an entity is removed from the world.
  // entity.dispose() has already been disposed by this point.
  entityRemoved(entity){
    this._entities.delete(entity);
  }

  // Called on every game tick. This is where the Rule will do most of
  //   its processing.
  updateAsync(){
    this._entities.forEach(entity, state){
      this._world.entityStates.set(entity, state);
    };
    return Promise.resolve(undefined);
  }
}
