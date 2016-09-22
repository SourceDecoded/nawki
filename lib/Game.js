"use strict"

var UPDATE_DELAY = 1000 / 60;

var invokeMethod = function(obj, methodName, args){
  args = Array.isArray(args) ? args : [] ;
  if (obj != null && typeof obj[methodName] === "function"){
    return obj[methodName].apply(obj, args);
  }
};

class Game {

  constructor(stage){
    this.systems = [];
    this.entities = [];
    this.timer = {
      isRunning: false,
      durations: []
      lastStartTime: 0
    };
  }

  stop(){
    var duration;
    if (this.timer.isRunning){
      this.timer.isRunning = false;
      duration = Date.now() - this.timer.lastStartTime;
      this.timer.durations.push(duration);
    }
  }

  start(){
    if (!this.timer.isRunning){
      this.timer.isRunning = true;
      this.timer.lastStartTime = Date.now();
    }
  }

  getTime(){
    var runningTime = 0;
    if (this.timer.isRunning){
        runningTime = Date.now() - this.timer.lastStartTime;
    }

    return this.timer.durations.reduce(function(totalTime, duration){
      return totalTime + duration;
    }, runningTime);

  loop(){
    var self = this;

    if (this.timer.isRunning){
      this.update();
      setTimeout(function(){
        self.loop();
      }, UPDATE_DELAY);
    }
  }

  update(){
    var self = this;

    this.systems.reduce(function(promise, system){
      return promise.then(function(){
        return invokeMethod(system, "updateAsync");
      });
    }, Promise.resolve(undefined));
  }

  addSystem(system){
    var systems = this.systems;
    invokeMethod(system, "activateAsync", [this]).then(function(){
      systems.push(system);
    });
  }

  removeSystem(){
    var systems = this.systems;
    invokeMethod(system, "deactivateAsync", []).then(function(){
      var index = systems.indexOf(system);
      if (index > -1){
        systems.splice(index, 1);
      }
    });
  }

  addEntity(entity){
    this.entities.push(entity);

    this.systems.forEach(function(system){
        return invokeMethod(system, "entityAdded", [entity]);
    };
  }

  removeEntity(entity){
    var index = this.entities.indexOf(entity);
    if (index > -1){
      this.entities.splice(index, 1);

      this.systems.forEach(function(system){
          return invokeMethod(system, "entityRemoved", [entity]);
      };
    }
  }

}
