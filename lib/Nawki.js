'use strict';
var World = require('./World');
var Entity = require('./Entity');
var fs = require('fs');
var path = require('path');

class Nawki {
  constructor() {
    this._networkConnections = [];
    this._world = new World();
    this._rulesLocations = [];
  }

  addRulesLocation(location) {
    this._rulesLocations.push(location);
  }

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
    Object.keys(ruleConfigs).forEach((key) => {
      this.loadRule(key, ruleConfigs[key]);
    });
  }

  loadRule(ruleName, ruleConfig) {
    ruleConfig = ruleConfig || {};
    var ruleLocationIndex = 0;
    var rule = null;
    while(!rule && ruleLocationIndex < this._rulesLocations.length) {
      var rulePath = path.resolve(this._rulesLocations[ruleLocationIndex], ruleName + ".js");
      var stat = fs.statSync(rulePath);
      if (stat.isFile()) {
        try {
          rule = new (require(rulePath))(ruleConfig);
        } catch(e) {
          console.error("Couldn't load rule at " + rulePath, e);
        }
      }
      ruleLocationIndex++;
    }
    if (!rule) {
      console.error("Rule not found: " + ruleName);
      return;
    }
    this._world.addRule(rule);
  }

}

module.exports = Nawki;
