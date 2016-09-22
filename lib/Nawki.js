'use strict';
var World = require('./World');
var Entity = require('./Entity');
var config = require('../rules.config');

class Nawki {
  constructor() {
    this._socketProvider = null;
  }

  set socketProvider(value) {
    if (!this._socketProvider) {
      self._socketProvider = value;
    }
  }




}


module.exports = function(socketProvider){
  var nawki = new Nawki();
  nawki.socketProvider = socketProvider;
  return nawki;
};
