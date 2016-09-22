'use strict';
var World = require('./World');
var Entity = require('./Entity');

class Nawki {
  constructor() {
    this._socketProvider = null;
    this._world = new World();
  }

  set socketProvider(value) {
    if (!this._socketProvider) {
      self._socketProvider = value;
    }
  }

  loadRules(ruleConfigs) {
    Object.keys(ruleConfigs).forEach(function(key){
      loadRule(ruleName, ruleConfig);
    });
  }

  loadRule(ruleName, ruleConfig){
    ruleConfig = ruleConfig || {};
    var Rule = require('./rules/' + ruleName);
    var rule = new Rule(ruleConfig);
    this._world.addRule(rule);
  }

}


module.exports = function(socketProvider){
  var nawki = new Nawki();
  nawki.socketProvider = socketProvider;
  return nawki;
};
