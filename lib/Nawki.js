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
    this._world.start();
  }

  addRulesLocation(location) {
    this._rulesLocations.push(location);
  }

  addNetworkConnection(networkConnection) {
    networkConnection.world = this._world;
    this._networkConnections.push(networkConnection);
  }

  loadRules(ruleConfigs) {
    ruleConfigs.rules.forEach((ruleConfig) => {
      var config = ruleConfig.config || {};
      this.loadRule(ruleConfig.rule, config);
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
