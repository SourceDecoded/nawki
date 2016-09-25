'use strict';
class Entity {
  constructor(type){
    this.type = type || null;
    this.id = null;
    this.properties = {};
  }

  getProperties(type){
    var properties = this.properties[type];
    if (!Array.isArray(properties)){
        properties = this.properties[type] = [];
    }

    return properties;
  }

  getProperty(type){
      this.getProperties(type)[0];
  }

  addProperty(property){
    var properties = this.getProperties(property.type);
    properties.push(property);
  }

  removeProperty(property){
    var properties = this.getProperties(property.type);
    var index = properties.indexOf(property);

    if (index > -1){
      properties.splice(index, 1);
    }
  }
}


module.exports = Entity;
