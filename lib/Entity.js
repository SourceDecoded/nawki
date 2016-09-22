class Entity {
  constructor(type){
    this.type = type || null;
    this.id = null;
    this.properties = {};
  }

  getPropertiesByType(type){
    var properties = this.properties[type];
    if (!Array.isArray(properties)){
        properties = this.properties[type] = [];
    }

    return properties;
  }

  getPropertyByType(type){
      this.getPropertiesByType(type)[0];
  }

  addProperty(property){
    var properties = this.getPropertiesByType(property.type);
    properties.push(property);
  }

  removeProperty(property){
    var properties = this.getPropertiesByType(property.type);
    var index = properties.indexOf(property);

    if (index > -1{
      properties.splice(index, 1);
    }
  }
}
