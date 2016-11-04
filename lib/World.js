'use strict';
const UPDATE_DELAY = 1000 / 60;
//const UPDATE_DELAY = 1000 * 2;

var invokeMethod = function(obj, methodName, args){
  args = Array.isArray(args) ? args : [] ;
  if (obj !== null && typeof obj[methodName] === "function"){
    return obj[methodName].apply(obj, args);
  }
};

var implementsInterface = function(obj, methodNames){
  return methodNames.every(function(methodName){
    return typeof obj[methodName] === "function";
  });
};

var rulesInterface = [
  "describe", "activateAsync", "deactivate", "entityAdded",
  "entityRemoved", "updateAsync"
];

class World {

  constructor(){
    this.rules = [];
    this.size = [];
    this.entities = [];
    this.watchers = [];
    this.entityStates = new Map();

    this.timer = {
      isRunning: false,
      durations: [],
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
      this.loop();
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
  }

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

    this.rules.reduce(function(promise, rule){
      return promise.then(function(){
        return invokeMethod(rule, "updateAsync");
      });
    }, Promise.resolve(undefined));
  }

  addRule(rule){
    if (!implementsInterface(rule, rulesInterface)){
      throw new Error("A Rule needs to implement all of these methods: "+ rulesInterface.join(", ")+".");
    }

    var rules = this.rules;

    invokeMethod(rule, "activateAsync", [this]).then(function(){
      rules.push(rule);
    });
  }

  removeRule(rule){
    var rules = this.rules;
    var index = rules.indexOf(rule);

    if (index > -1){
      rules.splice(index, 1);
    }

    invokeMethod(rule, "deactivate", []);
  }

  addEntity(entity){
    this.entities.push(entity);

    this.rules.forEach(function(rule){
        return invokeMethod(rule, "entityAdded", [entity]);
    });
  }

  removeEntity(entity){
    var index = this.entities.indexOf(entity);

    if (index > -1){
      this.entities.splice(index, 1);

      this.rules.forEach(function(rule){
          return invokeMethod(rule, "entityRemoved", [entity]);
      });
    }
  }

  entityInactive(entity){
    this.rules.forEach(function(rule){
      return invokeMethod(rule, "entityInactive", [entity]);
    });
  }

  describe() {
    return JSON.stringify(this.rules.map(function(rule){
      return rule.describe();
    }));
  }

}

module.exports = World;
