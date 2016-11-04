'use strict';
var uuid = require('uuid');

/*
* Standard property types:
*  * properties.request = data incoming from the brain
*
*/

class Entity {
  constructor(type){
    this.type = type || null;
    this.id = uuid.v4();
    this.properties = {};
  }

  setProperty(name, value){
    this.properties[name] = value;
  }

  getProperty(name) {
    return this.properties[name];
  }

  removeProperty(name) {
    delete this.properties[name];
  }

  hasProperty(name) {
    return (typeof this.properties[name] !== "undefined") &&
           (this.properties[name] !== null);
  }

}


module.exports = Entity;
