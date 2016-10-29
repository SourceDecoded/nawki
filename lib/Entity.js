'use strict';

/*
* Standard property types:
*  * properties.request = data incoming from the brain
*
*/

class Entity {
  constructor(type){
    this.type = type || null;
    this.id = null;
    this.properties = {};
  }

  setProperty(name, value){
    this.properties[name] = value;
  }

  getProperty(name) {
    return this.properties[name];
  }

  removeProperty(name) {
    this.properties[name] = undefined;
  }

  hasProperty(name) {
    return (typeof this.properties[name] !== "undefined") &&
           (this.properties[name] !== null);
  }

}


module.exports = Entity;
