'use strict';
var World = require('./World');
var Entity = require('./Entity');

class Nawki {
  constructor() {
    this._networkConnections = null;
    this._world = new World();
    this._rulesLocations = [];
  }

  addRulesLocation(location) {
    this._rulesLocations.push(location);
  };

  addNetworkConnection(networkConnection) {
    this._networkConnections.push(networkConnection);
    var connectionObserver = networkConnection.observe();
    connectionObserver.filter((e) => {
      return e.type === "connection";
    }).onEach((e) => {
      // the connection is an entity (organism or observer)
      e.client.filter((e) => {
        return e.type === "register-organism" || e.type === "register-observer";
      }).onEach((e) => {
        this._world.addEntity(e.client);
      });

      e.client.filter((e) => {
        return e.type === "describe";
      }).onEach((e) => {
        e.client.send(this._world.describe());
      });
    });
  }

  loadRules(ruleConfigs) {
    Object.keys(ruleConfigs).forEach(function(key){
      loadRule(ruleName, ruleConfig);
    });
  }

  loadRule(ruleName, ruleConfig) {
    ruleConfig = ruleConfig || {};
    var Rule = require('./rules/' + ruleName);
    var rule = new Rule(ruleConfig);
    this._world.addRule(rule);
  }

}

module.exports = Nawki;
